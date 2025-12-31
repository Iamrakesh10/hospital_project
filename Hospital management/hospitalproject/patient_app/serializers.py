from rest_framework import serializers
from .models import Appointment, MedicalRecord
from doctor_app.models import DoctorProfile

   
class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(
        source="patient.username",
        read_only=True
    )

    class Meta:
        model = Appointment
        fields = [
            "id",
            "doctor",
            "patient_name",
            "date",
            "time",
            "status",
        ]
        read_only_fields = ["status"]


class MedicalRecordSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source="doctor.username", read_only=True)

    class Meta:
        model = MedicalRecord
        fields = "__all__"
        read_only_fields = ["patient", "doctor", "created_at"]
