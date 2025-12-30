# doctor_app/models.py
from django.db import models
from django.contrib.auth.models import User

class DoctorProfile(models.Model):
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name='doctor_profile'  # Important: add related_name
    )
    specialization = models.CharField(max_length=100, default='General')
   
    is_available = models.BooleanField(default=True)
    
    def __str__(self):
        return self.user.username