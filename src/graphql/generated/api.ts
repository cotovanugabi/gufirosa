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
  stars?: Maybe<Array<Maybe<Star>>>;
};

export type Season = {
  __typename?: 'Season';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Star = {
  __typename?: 'Star';
  constellation?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type GetAllSeasonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSeasonsQuery = { __typename?: 'Query', seasons?: Array<{ __typename?: 'Season', id: string, name: string } | null> | null };

export type GetAllStarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllStarsQuery = { __typename?: 'Query', stars?: Array<{ __typename?: 'Star', id: string, name?: string | null, constellation?: string | null } | null> | null };


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
export const GetAllStarsDocument = gql`
    query GetAllStars {
  stars {
    id
    name
    constellation
  }
}
    `;

/**
 * __useGetAllStarsQuery__
 *
 * To run a query within a React component, call `useGetAllStarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllStarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllStarsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllStarsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllStarsQuery, GetAllStarsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllStarsQuery, GetAllStarsQueryVariables>(GetAllStarsDocument, options);
      }
export function useGetAllStarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllStarsQuery, GetAllStarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllStarsQuery, GetAllStarsQueryVariables>(GetAllStarsDocument, options);
        }
export type GetAllStarsQueryHookResult = ReturnType<typeof useGetAllStarsQuery>;
export type GetAllStarsLazyQueryHookResult = ReturnType<typeof useGetAllStarsLazyQuery>;
export type GetAllStarsQueryResult = Apollo.QueryResult<GetAllStarsQuery, GetAllStarsQueryVariables>;