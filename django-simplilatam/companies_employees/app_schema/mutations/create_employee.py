import graphene
from django.db import IntegrityError
from django.db import transaction
from graphql.error import GraphQLError
from companies_employees.models.employees import Employees


class CreateEmployee(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        rut = graphene.String(required=True)
        email = graphene.String(required=True)
        company_id = graphene.Int(required=True)

    success = graphene.Boolean(required=True)
    message = graphene.String(required=True)

    @transaction.atomic
    def mutate(self, info, **kwargs):
        try:
            name = kwargs.get("name")
            email = kwargs.get("email")
            rut = kwargs.get("rut")
            company = kwargs.get("company_id")
            Employees.objects.create(
                name=name,
                email=email,
                rut=rut,
                company_id=company,
            )
            return CreateEmployee(success=True, message="Ok")
        except IntegrityError:
            transaction.set_rollback(True)
            return CreateEmployee(success=False, message="Rut ya existe.")
        except Exception:
            transaction.set_rollback(True)
            raise GraphQLError("Ha ocurrido un error. Por favor intenta más tarde.")
