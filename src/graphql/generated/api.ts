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

export type Competition = {
  __typename?: 'Competition';
  groupId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type CreateEventInput = {
  competitionId: Scalars['Int'];
  groupId: Scalars['Int'];
  isHome: Scalars['Boolean'];
  opponentId: Scalars['Int'];
  seasonId: Scalars['Int'];
  teamId: Scalars['Int'];
};

export type Event = {
  __typename?: 'Event';
  competition: Competition;
  competitionId: Scalars['Int'];
  groupId: Scalars['Int'];
  id: Scalars['Int'];
  isHome: Scalars['Boolean'];
  opponent: Team;
  opponentId: Scalars['Int'];
  players?: Maybe<Array<EventPlayer>>;
  result?: Maybe<EventResult>;
  seasonId: Scalars['Int'];
  stats?: Maybe<Array<PlayerStats>>;
  team: Team;
  teamId: Scalars['Int'];
  votes?: Maybe<Array<Vote>>;
};

export type EventPlayer = {
  __typename?: 'EventPlayer';
  player: PlaterData;
  status: PlayerStatus;
};

export type EventResult = {
  __typename?: 'EventResult';
  opponentGoals: Scalars['Int'];
  teamGoals: Scalars['Int'];
};

export type EventStats = {
  assists: Scalars['Int'];
  eventId: Scalars['Int'];
  goals: Scalars['Int'];
  id?: InputMaybe<Scalars['Int']>;
  playerId: Scalars['Int'];
  redCards: Scalars['Int'];
  yellowCards: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCompetition?: Maybe<Competition>;
  submitEventStats?: Maybe<Array<PlayerStats>>;
};


export type MutationCreateCompetitionArgs = {
  name: Scalars['String'];
};


export type MutationSubmitEventStatsArgs = {
  input: SubmitEventsStatsInput;
};

export type PlaterData = {
  __typename?: 'PlaterData';
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  number: Scalars['Int'];
};

export type Player = {
  __typename?: 'Player';
  email: Scalars['String'];
  events?: Maybe<Array<Maybe<Event>>>;
  firstName: Scalars['String'];
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  number: Scalars['Int'];
  receivedVotes?: Maybe<Array<Maybe<Vote>>>;
  stats?: Maybe<Array<Maybe<PlayerStats>>>;
  submitedVotes?: Maybe<Array<Maybe<Vote>>>;
  team: Team;
  teamId: Scalars['Int'];
};

export type PlayerStats = {
  __typename?: 'PlayerStats';
  assists: Scalars['Int'];
  eventId: Scalars['Int'];
  firstName: Scalars['String'];
  goals: Scalars['Int'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  playerId: Scalars['Int'];
  redCards: Scalars['Int'];
  yellowCards: Scalars['Int'];
};

export enum PlayerStatus {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Pending = 'PENDING'
}

export type Query = {
  __typename?: 'Query';
  event?: Maybe<Event>;
  eventStats?: Maybe<Array<PlayerStats>>;
  events?: Maybe<Array<Maybe<Event>>>;
};


export type QueryEventArgs = {
  input: QueryEventInput;
};


export type QueryEventStatsArgs = {
  input: QueryEventStatsInput;
};


export type QueryEventsArgs = {
  input: QueryByGroupAndSeasonInput;
};

export type QueryByGroupAndSeasonInput = {
  groupId: Scalars['Int'];
  seasonId: Scalars['Int'];
};

export type QueryEventInput = {
  eventId: Scalars['Int'];
};

export type QueryEventStatsInput = {
  eventId: Scalars['Int'];
};

export type SubmitEventsStatsInput = {
  players?: InputMaybe<Array<EventStats>>;
};

export type Team = {
  __typename?: 'Team';
  groupId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
  owned: Scalars['Boolean'];
  players?: Maybe<Array<Player>>;
};

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['Int'];
  owner: Player;
  ownerId: Scalars['Int'];
  player: Player;
  playerId: Scalars['Int'];
  points: Scalars['Int'];
};

export type SubmitEventStatsMutationVariables = Exact<{
  input: SubmitEventsStatsInput;
}>;


export type SubmitEventStatsMutation = { __typename?: 'Mutation', submitEventStats?: Array<{ __typename?: 'PlayerStats', id: number, goals: number, assists: number, redCards: number, yellowCards: number, playerId: number, eventId: number, firstName: string, lastName: string }> | null };

export type GetAllEventsQueryVariables = Exact<{
  input: QueryByGroupAndSeasonInput;
}>;


export type GetAllEventsQuery = { __typename?: 'Query', events?: Array<{ __typename?: 'Event', id: number, isHome: boolean, teamId: number, opponentId: number, competition: { __typename?: 'Competition', name: string }, team: { __typename?: 'Team', name: string }, opponent: { __typename?: 'Team', name: string }, result?: { __typename?: 'EventResult', teamGoals: number, opponentGoals: number } | null } | null> | null };

export type GetEventQueryVariables = Exact<{
  input: QueryEventInput;
}>;


export type GetEventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: number, isHome: boolean, teamId: number, opponentId: number, competition: { __typename?: 'Competition', name: string }, players?: Array<{ __typename?: 'EventPlayer', status: PlayerStatus, player: { __typename?: 'PlaterData', id: number, number: number, firstName: string, lastName: string } }> | null, team: { __typename?: 'Team', name: string }, opponent: { __typename?: 'Team', name: string }, result?: { __typename?: 'EventResult', teamGoals: number, opponentGoals: number } | null } | null };

export type GetEventStatsQueryVariables = Exact<{
  input: QueryEventStatsInput;
}>;


export type GetEventStatsQuery = { __typename?: 'Query', eventStats?: Array<{ __typename?: 'PlayerStats', playerId: number, eventId: number, goals: number, assists: number, yellowCards: number, redCards: number, firstName: string, lastName: string }> | null };


export const SubmitEventStatsDocument = gql`
    mutation SubmitEventStats($input: SubmitEventsStatsInput!) {
  submitEventStats(input: $input) {
    id
    goals
    assists
    redCards
    yellowCards
    playerId
    eventId
    firstName
    lastName
  }
}
    `;
export type SubmitEventStatsMutationFn = Apollo.MutationFunction<SubmitEventStatsMutation, SubmitEventStatsMutationVariables>;

/**
 * __useSubmitEventStatsMutation__
 *
 * To run a mutation, you first call `useSubmitEventStatsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitEventStatsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitEventStatsMutation, { data, loading, error }] = useSubmitEventStatsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitEventStatsMutation(baseOptions?: Apollo.MutationHookOptions<SubmitEventStatsMutation, SubmitEventStatsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitEventStatsMutation, SubmitEventStatsMutationVariables>(SubmitEventStatsDocument, options);
      }
export type SubmitEventStatsMutationHookResult = ReturnType<typeof useSubmitEventStatsMutation>;
export type SubmitEventStatsMutationResult = Apollo.MutationResult<SubmitEventStatsMutation>;
export type SubmitEventStatsMutationOptions = Apollo.BaseMutationOptions<SubmitEventStatsMutation, SubmitEventStatsMutationVariables>;
export const GetAllEventsDocument = gql`
    query GetAllEvents($input: QueryByGroupAndSeasonInput!) {
  events(input: $input) {
    id
    isHome
    teamId
    opponentId
    competition {
      name
    }
    team {
      name
    }
    opponent {
      name
    }
    result {
      teamGoals
      opponentGoals
    }
  }
}
    `;

/**
 * __useGetAllEventsQuery__
 *
 * To run a query within a React component, call `useGetAllEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllEventsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAllEventsQuery(baseOptions: Apollo.QueryHookOptions<GetAllEventsQuery, GetAllEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllEventsQuery, GetAllEventsQueryVariables>(GetAllEventsDocument, options);
      }
export function useGetAllEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllEventsQuery, GetAllEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllEventsQuery, GetAllEventsQueryVariables>(GetAllEventsDocument, options);
        }
export type GetAllEventsQueryHookResult = ReturnType<typeof useGetAllEventsQuery>;
export type GetAllEventsLazyQueryHookResult = ReturnType<typeof useGetAllEventsLazyQuery>;
export type GetAllEventsQueryResult = Apollo.QueryResult<GetAllEventsQuery, GetAllEventsQueryVariables>;
export const GetEventDocument = gql`
    query GetEvent($input: QueryEventInput!) {
  event(input: $input) {
    id
    isHome
    teamId
    opponentId
    competition {
      name
    }
    players {
      player {
        id
        number
        firstName
        lastName
      }
      status
    }
    team {
      name
    }
    opponent {
      name
    }
    result {
      teamGoals
      opponentGoals
    }
  }
}
    `;

/**
 * __useGetEventQuery__
 *
 * To run a query within a React component, call `useGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetEventQuery(baseOptions: Apollo.QueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
      }
export function useGetEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
        }
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>;
export type GetEventLazyQueryHookResult = ReturnType<typeof useGetEventLazyQuery>;
export type GetEventQueryResult = Apollo.QueryResult<GetEventQuery, GetEventQueryVariables>;
export const GetEventStatsDocument = gql`
    query GetEventStats($input: QueryEventStatsInput!) {
  eventStats(input: $input) {
    playerId
    eventId
    goals
    assists
    yellowCards
    redCards
    firstName
    lastName
  }
}
    `;

/**
 * __useGetEventStatsQuery__
 *
 * To run a query within a React component, call `useGetEventStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventStatsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetEventStatsQuery(baseOptions: Apollo.QueryHookOptions<GetEventStatsQuery, GetEventStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventStatsQuery, GetEventStatsQueryVariables>(GetEventStatsDocument, options);
      }
export function useGetEventStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventStatsQuery, GetEventStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventStatsQuery, GetEventStatsQueryVariables>(GetEventStatsDocument, options);
        }
export type GetEventStatsQueryHookResult = ReturnType<typeof useGetEventStatsQuery>;
export type GetEventStatsLazyQueryHookResult = ReturnType<typeof useGetEventStatsLazyQuery>;
export type GetEventStatsQueryResult = Apollo.QueryResult<GetEventStatsQuery, GetEventStatsQueryVariables>;