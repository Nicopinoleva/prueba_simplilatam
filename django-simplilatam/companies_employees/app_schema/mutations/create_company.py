import graphene
from django.db import transaction
from graphql.error import GraphQLError
from companies_employees.models.companies import Companies


class CreateCompany(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        address = graphene.String(required=True)
        rut = graphene.String(required=True)
        phone_number = graphene.String(required=True)

    success = graphene.Boolean()

    @transaction.atomic
    def mutate(self, info, **kwargs):
        try:
            name = kwargs.get("name")
            address = kwargs.get("address")
            rut = kwargs.get("rut")
            phone_number = kwargs.get("phone_number")
            Companies.objects.create(
                name=name,
                address=address,
                rut=rut,
                phone_number=phone_number,
            )
            return CreateCompany(success=True)
        except Exception:
            transaction.set_rollback(True)
            raise GraphQLError("Ha ocurrido un error. Por favor intenta más tarde.")
