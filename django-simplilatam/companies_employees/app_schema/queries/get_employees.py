import graphene
from companies_employees.models.employees import Employees
from companies_employees.app_schema.types import EmployeesType


class GetEmployees(graphene.ObjectType):
    get_employees = graphene.List(EmployeesType)

    def resolve_get_employees(self, info):
        qs = Employees.objects.select_related("company").all()
        return qs
