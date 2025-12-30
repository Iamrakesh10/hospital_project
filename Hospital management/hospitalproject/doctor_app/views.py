from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from patient_app.models import Appointment
from patient_app.serializers import AppointmentSerializer
from .models import DoctorProfile
from .serializers import DoctorSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from patient_app.models import MedicalRecord
from django.contrib.auth.models import User



class DoctorListView(ListAPIView):
    serializer_class = DoctorSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return DoctorProfile.objects.filter(is_available=True)



class DoctorAppointmentListView(ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        doctor_profile = DoctorProfile.objects.get(user=self.request.user)
        return Appointment.objects.filter(
            doctor=doctor_profile
        ).order_by("-date")


class AppointmentStatusUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        # ✅ Role check
        if request.user.profile.role != "DOCTOR":
            return Response({"error": "Unauthorized"}, status=403)

        try:
            # ✅ IMPORTANT FIX HERE
            appointment = Appointment.objects.get(
                id=pk,
                doctor__user=request.user   # 🔥 correct relation
            )
        except Appointment.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=404)

        status_value = request.data.get("status")

        if status_value not in ["APPROVED", "REJECTED"]:
            return Response({"error": "Invalid status"}, status=400)

        appointment.status = status_value
        appointment.save()

        return Response(
            {"message": f"Appointment {status_value.lower()}"},
            status=200
        )


class MyPatientsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.profile.role != "DOCTOR":
            return Response({"error": "Unauthorized"}, status=403)

        appointments = Appointment.objects.filter(
            doctor__user=request.user,
            status="APPROVED"
        ).select_related("patient")

        patients = {}
        for a in appointments:
            patients[a.patient.id] = {
                "id": a.patient.id,
                "username": a.patient.username,
            }

        return Response(list(patients.values()))        
    
class WritePrescriptionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, patient_id):
        if request.user.profile.role != "DOCTOR":
            return Response({"error": "Unauthorized"}, status=403)

        # ✅ Get patient
        try:
            patient = User.objects.get(id=patient_id)
        except User.DoesNotExist:
            return Response({"error": "Patient not found"}, status=404)

        # ✅ Get doctor profile (THIS WAS MISSING)
        try:
            doctor = DoctorProfile.objects.get(user=request.user)
        except DoctorProfile.DoesNotExist:
            return Response({"error": "Doctor profile not found"}, status=404)

        # ✅ Now doctor variable EXISTS
        MedicalRecord.objects.create(
            patient=patient,
            doctor=request.user,
            diagnosis=request.data.get("diagnosis"),
            prescription=request.data.get("prescription"),
        )

        return Response({"message": "Prescription saved"}, status=201)