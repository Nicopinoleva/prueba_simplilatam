from django.db import models


class Companies(models.Model):
    name = models.CharField(max_length=100, verbose_name='Nombre empresa')
    address = models.CharField(max_length=200, verbose_name='Dirección')
    rut = models.CharField(max_length=10, verbose_name='RUT')

    def __str__(self):
        return self.name
