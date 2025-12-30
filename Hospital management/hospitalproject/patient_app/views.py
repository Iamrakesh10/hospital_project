from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User

from doctor_app.models import DoctorProfile

from .models import Appointment, MedicalRecord
from .serializers import AppointmentSerializer, MedicalRecordSerializer

class DoctorListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.profile.role != "PATIENT":
            return Response({"error": "Unauthorized"}, status=403)

        # doctors = DoctorProfile.objects.select_related("user")
        doctors = DoctorProfile.objects.filter(
            user__profile__is_approved=True   # 🔒 THIS IS THE KEY
        ).select_related("user")

        data = [
            {
                "id": d.id,                 # ✅ DoctorProfile ID
                "username": d.user.username,
                
            }
            for d in doctors
        ]
        return Response(data)

class AppointmentCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.profile.role != "PATIENT":
            return Response({"error": "Only patients can book"}, status=403)

        serializer = AppointmentSerializer(data=request.data)

        # ✅ FIXED LOGIC
        if not serializer.is_valid():
            print(serializer.errors)   # DEBUG
            return Response(serializer.errors, status=400)

        serializer.save(patient=request.user)
        return Response(serializer.data, status=201)


class PatientAppointmentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.profile.role != "PATIENT":
            return Response({"error": "Unauthorized"}, status=403)

        appointments = Appointment.objects.filter(patient=request.user)
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

class PatientMedicalRecordsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.profile.role != "PATIENT":
            return Response({"error": "Unauthorized"}, status=403)

        records = MedicalRecord.objects.filter(patient=request.user)
        serializer = MedicalRecordSerializer(records, many=True)
        return Response(serializer.data)
