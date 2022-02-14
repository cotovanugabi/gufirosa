import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateSeasonInput = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSeason?: Maybe<Season>;
};


export type MutationCreateSeasonArgs = {
  input?: InputMaybe<CreateSeasonInput>;
};

export type Query = {
  __typename?: 'Query';
  seasons?: Maybe<Array<Maybe<Season>>>;
};

export type Season = {
  __typename?: 'Season';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateSeasonMutationVariables = Exact<{
  input?: InputMaybe<CreateSeasonInput>;
}>;


export type CreateSeasonMutation = { __typename?: 'Mutation', createSeason?: { __typename?: 'Season', id: string, name: string } | null };

export type GetAllSeasonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSeasonsQuery = { __typename?: 'Query', seasons?: Array<{ __typename?: 'Season', id: string, name: string } | null> | null };


export const CreateSeasonDocument = gql`
    mutation CreateSeason($input: CreateSeasonInput) {
  createSeason(input: $input) {
    id
    name
  }
}
    `;
export type CreateSeasonMutationFn = Apollo.MutationFunction<CreateSeasonMutation, CreateSeasonMutationVariables>;

/**
 * __useCreateSeasonMutation__
 *
 * To run a mutation, you first call `useCreateSeasonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSeasonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSeasonMutation, { data, loading, error }] = useCreateSeasonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSeasonMutation(baseOptions?: Apollo.MutationHookOptions<CreateSeasonMutation, CreateSeasonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSeasonMutation, CreateSeasonMutationVariables>(CreateSeasonDocument, options);
      }
export type CreateSeasonMutationHookResult = ReturnType<typeof useCreateSeasonMutation>;
export type CreateSeasonMutationResult = Apollo.MutationResult<CreateSeasonMutation>;
export type CreateSeasonMutationOptions = Apollo.BaseMutationOptions<CreateSeasonMutation, CreateSeasonMutationVariables>;
export const GetAllSeasonsDocument = gql`
    query GetAllSeasons {
  seasons {
    id
    name
  }
}
    `;

/**
 * __useGetAllSeasonsQuery__
 *
 * To run a query within a React component, call `useGetAllSeasonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSeasonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSeasonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSeasonsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSeasonsQuery, GetAllSeasonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSeasonsQuery, GetAllSeasonsQueryVariables>(GetAllSeasonsDocument, options);
      }
export function useGetAllSeasonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSeasonsQuery, GetAllSeasonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSeasonsQuery, GetAllSeasonsQueryVariables>(GetAllSeasonsDocument, options);
        }
export type GetAllSeasonsQueryHookResult = ReturnType<typeof useGetAllSeasonsQuery>;
export type GetAllSeasonsLazyQueryHookResult = ReturnType<typeof useGetAllSeasonsLazyQuery>;
export type GetAllSeasonsQueryResult = Apollo.QueryResult<GetAllSeasonsQuery, GetAllSeasonsQueryVariables>;