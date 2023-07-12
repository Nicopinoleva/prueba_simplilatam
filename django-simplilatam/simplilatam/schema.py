import graphene

import companies_employees.schema


class Mutation(
    companies_employees.schema.Mutation,
    graphene.ObjectType,
):
    pass


class Query(companies_employees.schema.Query):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
