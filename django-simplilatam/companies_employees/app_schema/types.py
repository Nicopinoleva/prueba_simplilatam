import graphene
from graphene_django import DjangoObjectType

from companies_employees.models import Companies
from companies_employees.models import Employees


class CompaniesType(DjangoObjectType):
    id = graphene.ID()
    name = graphene.String()
    address = graphene.String()
    rut = graphene.String()
    phone_number = graphene.String()

    class Meta:
        model = Companies


class EmployeesType(DjangoObjectType):
    id = graphene.ID()
    name = graphene.String()
    rut = graphene.String()

    class Meta:
        model = Employees
