from django.db import models
from companies_employees.models import Companies


class Employees(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre empleado")
    rut = models.CharField(max_length=15, verbose_name="RUT")
    email = models.CharField(max_length=50, verbose_name="Email")
    company = models.ForeignKey(Companies, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
