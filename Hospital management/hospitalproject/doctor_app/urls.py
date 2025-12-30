from django.urls import path
from .views import DoctorAppointmentListView, DoctorListView , AppointmentStatusUpdateView, MyPatientsView , WritePrescriptionView

urlpatterns = [
    path("doctors/", DoctorListView.as_view(), name="doctor-list"),
    path("appointments/", DoctorAppointmentListView.as_view(), name="doctor-appointments"),
    path(
        "appointments/<int:pk>/status/", AppointmentStatusUpdateView.as_view()),
    path("mypatients/", MyPatientsView.as_view()),
    path("prescribe/<int:patient_id>/", WritePrescriptionView.as_view()),

]
