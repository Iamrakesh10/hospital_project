from django.urls import path
from .views import ApproveDoctorView, DepartmentView

urlpatterns = [
    path("approve-doctor/<int:profile_id>/", ApproveDoctorView.as_view()),
    path("departments/", DepartmentView.as_view()),
]
