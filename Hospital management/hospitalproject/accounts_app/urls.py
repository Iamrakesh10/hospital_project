from django.urls import path
from .views import RegisterView , LoginView , AdminDoctorListView, AdminApproveDoctorView, AdminDepartmentView , AdminPatientListView, AdminTogglePatientView, AdminAppointmentListView, AdminUpdateAppointmentStatusView

urlpatterns = [
     path('register/', RegisterView.as_view()),
     path('login/', LoginView.as_view()),
     path("admin/doctors/", AdminDoctorListView.as_view()),
     path("admin/approve-doctor/<int:id>/", AdminApproveDoctorView.as_view()),
     path("admin/departments/", AdminDepartmentView.as_view()),
     path("admin/patients/", AdminPatientListView.as_view()),
     path("admin/patients/toggle/<int:id>/", AdminTogglePatientView.as_view()),
     path("admin/appointments/", AdminAppointmentListView.as_view()),
     path("admin/appointments/<int:id>/status/", AdminUpdateAppointmentStatusView.as_view()),

]
