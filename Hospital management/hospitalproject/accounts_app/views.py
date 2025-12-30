from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny  ,IsAuthenticated
from patient_app.models import Appointment
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer, MyTokenSerializer
# accounts/views.py

# accounts/views.py
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Profile, Department
from .serializers import DoctorSerializer, DepartmentSerializer
from .permissions import IsAdmin

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Profile
from .permissions import IsAdmin




class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class LoginView(TokenObtainPairView):
    serializer_class = MyTokenSerializer


## admin features


class AdminDoctorListView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        doctors = Profile.objects.filter(role="DOCTOR")
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data)

class AdminApproveDoctorView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def patch(self, request, id):
        doctor = get_object_or_404(Profile, id=id, role="DOCTOR")
        doctor.is_approved = True
        doctor.save()
        return Response({"message": "Doctor approved successfully"})


class AdminDepartmentView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DepartmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Department added"})
        return Response(serializer.errors, status=400)


class AdminPatientListView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        patients = Profile.objects.filter(role="PATIENT").select_related("user")

        data = [
            {
                "id": p.id,
                "username": p.user.username,
                "email": p.user.email,
                "phone": p.phone,
                "age": p.age,
                "sex": p.sex,
                "is_active": p.user.is_active,
            }
            for p in patients
        ]
        return Response(data)

class AdminTogglePatientView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def patch(self, request, id):
        patient = get_object_or_404(Profile, id=id, role="PATIENT")

        patient.user.is_active = not patient.user.is_active
        patient.user.save()

        return Response({
            "message": "Patient status updated",
            "is_active": patient.user.is_active
        })


class AdminAppointmentListView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        appointments = Appointment.objects.select_related(
            "patient", "doctor"
        ).all()

        data = [
            {
                "id": a.id,
                "patient": a.patient.username,
                "doctor": a.doctor.user.username,
                "date": a.date,
                "time": a.time,
                "status": a.status,
            }
            for a in appointments
        ]

        return Response(data)


class AdminUpdateAppointmentStatusView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def patch(self, request, id):
        appointment = Appointment.objects.get(id=id)
        status = request.data.get("status")

        if status not in ["APPROVED", "REJECTED", "CANCELLED"]:
            return Response({"error": "Invalid status"}, status=400)

        appointment.status = status
        appointment.save()

        return Response({"message": "Status updated"})
