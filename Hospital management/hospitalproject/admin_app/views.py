from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts_app.models import Profile


class ApproveDoctorView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, profile_id):
        if request.user.profile.role != "ADMIN":
            return Response({"error": "Unauthorized"}, status=403)

        profile = Profile.objects.get(id=profile_id, role="DOCTOR")
        profile.is_approved = True
        profile.save()

        return Response({"message": "Doctor approved"})


from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from doctor_app.models import Department


class DepartmentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.profile.role != "ADMIN":
            return Response({"error": "Unauthorized"}, status=403)

        departments = Department.objects.all().values("id", "name")
        return Response(departments)

    def post(self, request):
        if request.user.profile.role != "ADMIN":
            return Response({"error": "Unauthorized"}, status=403)

        Department.objects.create(name=request.data.get("name"))
        return Response({"message": "Department created"})
