# Generated by Django 4.2.3 on 2023-07-12 12:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('companies_employees', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companies',
            name='rut',
            field=models.CharField(max_length=15, unique=True, verbose_name='RUT'),
        ),
        migrations.AlterField(
            model_name='employees',
            name='rut',
            field=models.CharField(max_length=15, unique=True, verbose_name='RUT'),
        ),
    ]
