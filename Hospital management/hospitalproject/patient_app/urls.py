from django.urls import path
from .views import (
    DoctorListView,
    AppointmentCreateView,
    PatientAppointmentsView,
    PatientMedicalRecordsView,
)

urlpatterns = [
    path("doctors/", DoctorListView.as_view()),
    path("appointments/", AppointmentCreateView.as_view()),
    path("appointments/my/", PatientAppointmentsView.as_view()),
    path("records/", PatientMedicalRecordsView.as_view()),
]
