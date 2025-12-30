# doctor_app/serializers.py
from rest_framework import serializers
from .models import DoctorProfile

class DoctorSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="user.username")

    class Meta:
        model = DoctorProfile
        fields = ["id", "name", "specialization" ]
