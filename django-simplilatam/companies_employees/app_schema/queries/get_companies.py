import graphene
from companies_employees.models.companies import Companies
from companies_employees.app_schema.types import CompaniesType


class GetCompanies(graphene.ObjectType):
    get_companies = graphene.List(CompaniesType)

    def resolve_get_companies(self, info):
        qs = Companies.objects.all()
        return qs
