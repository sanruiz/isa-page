/**
 * GraphQL client for WordPress API
 */

const GRAPHQL_ENDPOINT = "https://web.isaartstudio.com/graphql/";

interface GraphQLRequestOptions {
  query: string;
  variables?: Record<string, unknown>;
}

/**
 * Execute a GraphQL query against the WordPress API
 * @param options - Query and optional variables
 * @returns The parsed JSON response
 * @throws Error if the request fails
 */
export async function graphqlRequest<T>(
  options: GraphQLRequestOptions,
): Promise<T> {
  const { query, variables } = options;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    const errorMessage = json.errors
      .map((e: { message: string }) => e.message)
      .join(", ");
    throw new Error(`GraphQL errors: ${errorMessage}`);
  }

  return json as T;
}
