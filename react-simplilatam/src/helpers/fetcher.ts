import { OperationDefinitionNode, parse } from 'graphql';

export const fetchData =
  <TData, TVariables>(
    query: string,
    variables?: TVariables,
    options?: RequestInit['headers']
  ): (() => Promise<TData>) =>
  async () => {
    const res = await fetch(`${window.location.origin}/graphql/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options,
      },
      body: JSON.stringify({
        query,
        variables,
        operationName:
          (parse(query).definitions[0] as OperationDefinitionNode)?.name?.value ||
          'noOperationName',
      }),
    });

    const json = await res.json();

    return json.data;
  };
