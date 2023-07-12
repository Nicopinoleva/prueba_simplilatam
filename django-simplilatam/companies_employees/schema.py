from graphene_django.types import ObjectType

from companies_employees.app_schema.queries import GetCompanies
from companies_employees.app_schema.queries import GetEmployees
from companies_employees.app_schema.mutations import CreateCompany
from companies_employees.app_schema.mutations import CreateEmployee


class Mutation(ObjectType):
    create_company = CreateCompany.Field()
    create_employee = CreateEmployee.Field()


class Query(GetCompanies, GetEmployees):
    pass
