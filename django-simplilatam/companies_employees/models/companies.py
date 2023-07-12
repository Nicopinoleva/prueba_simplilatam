from django.db import models


class Companies(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre empresa")
    address = models.CharField(max_length=100, verbose_name="Dirección")
    rut = models.CharField(max_length=15, verbose_name="RUT", unique=True)
    phone_number = models.CharField(max_length=15, verbose_name="Número telefónico")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
