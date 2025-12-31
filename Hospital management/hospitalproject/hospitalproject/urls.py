from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/accounts/", include("accounts_app.urls")),
    path("api/patient/", include("patient_app.urls")),
    path("api/doctor/", include("doctor_app.urls")),
    path("api/payments/", include("payments_app.urls")),
]
