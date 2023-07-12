import { GraphQLError } from 'graphql';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { fetchData } from '@/helpers/fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string | Date; output: string | Date; }
};

export type CompaniesType = {
  address: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  employeesSet: Array<EmployeesType>;
  id: Maybe<Scalars['ID']['output']>;
  name: Maybe<Scalars['String']['output']>;
  phoneNumber: Maybe<Scalars['String']['output']>;
  rut: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateCompany = {
  message: Maybe<Scalars['String']['output']>;
  success: Maybe<Scalars['Boolean']['output']>;
};

export type CreateEmployee = {
  message: Maybe<Scalars['String']['output']>;
  success: Maybe<Scalars['Boolean']['output']>;
};

export type EmployeesType = {
  company: CompaniesType;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Maybe<Scalars['ID']['output']>;
  name: Maybe<Scalars['String']['output']>;
  rut: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  createCompany: Maybe<CreateCompany>;
  createEmployee: Maybe<CreateEmployee>;
};


export type MutationCreateCompanyArgs = {
  address: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  rut: Scalars['String']['input'];
};


export type MutationCreateEmployeeArgs = {
  companyId: Scalars['Int']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  rut: Scalars['String']['input'];
};

export type Query = {
  getCompanies: Maybe<Array<Maybe<CompaniesType>>>;
  getEmployees: Maybe<Array<Maybe<EmployeesType>>>;
};

export type GetCompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCompaniesQuery = { getCompanies: Array<{ id: string | null, address: string | null, name: string | null, rut: string | null, phoneNumber: string | null } | null> | null };

export type GetEmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEmployeesQuery = { getEmployees: Array<{ id: string | null, name: string | null, rut: string | null, email: string, company: { name: string | null } } | null> | null };

export type CreateCompanyMutationVariables = Exact<{
  name: Scalars['String']['input'];
  address: Scalars['String']['input'];
  rut: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
}>;


export type CreateCompanyMutation = { createCompany: { success: boolean | null, message: string | null } | null };

export type CreateEmployeeMutationVariables = Exact<{
  name: Scalars['String']['input'];
  companyId: Scalars['Int']['input'];
  rut: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type CreateEmployeeMutation = { createEmployee: { success: boolean | null, message: string | null } | null };


export const GetCompaniesDocument = `
    query GetCompanies {
  getCompanies {
    id
    address
    name
    rut
    phoneNumber
  }
}
    `;
export const useGetCompaniesQuery = <
      TData = GetCompaniesQuery,
      TError = GraphQLError
    >(
      variables?: GetCompaniesQueryVariables,
      options?: UseQueryOptions<GetCompaniesQuery, TError, TData>
    ) =>
    useQuery<GetCompaniesQuery, TError, TData>(
      variables === undefined ? ['GetCompanies'] : ['GetCompanies', variables],
      fetchData<GetCompaniesQuery, GetCompaniesQueryVariables>(GetCompaniesDocument, variables),
      options
    );
useGetCompaniesQuery.document = GetCompaniesDocument;

export const GetEmployeesDocument = `
    query GetEmployees {
  getEmployees {
    id
    name
    rut
    email
    company {
      name
    }
  }
}
    `;
export const useGetEmployeesQuery = <
      TData = GetEmployeesQuery,
      TError = GraphQLError
    >(
      variables?: GetEmployeesQueryVariables,
      options?: UseQueryOptions<GetEmployeesQuery, TError, TData>
    ) =>
    useQuery<GetEmployeesQuery, TError, TData>(
      variables === undefined ? ['GetEmployees'] : ['GetEmployees', variables],
      fetchData<GetEmployeesQuery, GetEmployeesQueryVariables>(GetEmployeesDocument, variables),
      options
    );
useGetEmployeesQuery.document = GetEmployeesDocument;

export const CreateCompanyDocument = `
    mutation CreateCompany($name: String!, $address: String!, $rut: String!, $phoneNumber: String!) {
  createCompany(
    name: $name
    address: $address
    rut: $rut
    phoneNumber: $phoneNumber
  ) {
    success
    message
  }
}
    `;
export const useCreateCompanyMutation = <
      TError = GraphQLError,
      TContext = unknown
    >(options?: UseMutationOptions<CreateCompanyMutation, TError, CreateCompanyMutationVariables, TContext>) =>
    useMutation<CreateCompanyMutation, TError, CreateCompanyMutationVariables, TContext>(
      ['CreateCompany'],
      (variables?: CreateCompanyMutationVariables) => fetchData<CreateCompanyMutation, CreateCompanyMutationVariables>(CreateCompanyDocument, variables)(),
      options
    );
export const CreateEmployeeDocument = `
    mutation CreateEmployee($name: String!, $companyId: Int!, $rut: String!, $email: String!) {
  createEmployee(name: $name, companyId: $companyId, rut: $rut, email: $email) {
    success
    message
  }
}
    `;
export const useCreateEmployeeMutation = <
      TError = GraphQLError,
      TContext = unknown
    >(options?: UseMutationOptions<CreateEmployeeMutation, TError, CreateEmployeeMutationVariables, TContext>) =>
    useMutation<CreateEmployeeMutation, TError, CreateEmployeeMutationVariables, TContext>(
      ['CreateEmployee'],
      (variables?: CreateEmployeeMutationVariables) => fetchData<CreateEmployeeMutation, CreateEmployeeMutationVariables>(CreateEmployeeDocument, variables)(),
      options
    );