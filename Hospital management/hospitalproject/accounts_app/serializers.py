from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from doctor_app.models import DoctorProfile


class RegisterSerializer(serializers.Serializer):
    # Common fields for all users
    role = serializers.CharField(write_only=True)
    phone = serializers.CharField(write_only=True)
    age = serializers.IntegerField(write_only=True)
    sex = serializers.CharField(write_only=True)
    address = serializers.CharField(write_only=True)
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    # Doctor-specific fields (optional, will be ignored for non-doctors)
    specialization = serializers.CharField(write_only=True, required=False, allow_blank=True)


    def validate(self, data):
        # Additional validation for doctors
        if data.get('role') == 'DOCTOR':
            # Set defaults if not provided
            if not data.get('specialization'):
                data['specialization'] = 'General'
            if data.get('experience') is None:
                data['experience'] = 0
            if not data.get('qualification'):
                data['qualification'] = ''
        
        return data

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value

    def create(self, validated_data):
        role = validated_data.pop("role")
        phone = validated_data.pop("phone")
        age = validated_data.pop("age")
        sex = validated_data.pop("sex")
        address = validated_data.pop("address")
        
        # Extract doctor fields if they exist
        specialization = validated_data.pop("specialization", "General")
       
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )

        # Create profile
        Profile.objects.create(
            user=user,
            role=role,
            phone=phone,
            age=age,
            sex=sex,
            address=address
        )

        # Create DoctorProfile for doctors
        if role == "DOCTOR":
            DoctorProfile.objects.create(
                user=user,
                specialization=specialization,
               
                is_available=True  # Added this field
            )

        # Admin permissions
        elif role == "ADMIN":
            user.is_staff = True
            user.is_superuser = True
            user.save()

        return user


class MyTokenSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data["role"] = self.user.profile.role.lower()
        return data
    

### for admin module

# accounts/serializers.py
from rest_framework import serializers
from .models import Profile, Department

class DoctorSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = Profile
        fields = ["id", "username", "email", "is_approved"]


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"
