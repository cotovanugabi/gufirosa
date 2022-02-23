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
  id: Scalars['ID'];
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
  competition?: Maybe<Competition>;
  competitionId: Scalars['Int'];
  groupId: Scalars['Int'];
  id: Scalars['ID'];
  isHome: Scalars['Boolean'];
  opponent?: Maybe<Team>;
  opponentId: Scalars['Int'];
  players?: Maybe<Array<Maybe<EventPlayer>>>;
  result?: Maybe<EventResult>;
  seasonId: Scalars['Int'];
  stats?: Maybe<Array<Maybe<PlayerStats>>>;
  team?: Maybe<Team>;
  teamId: Scalars['Int'];
  votes?: Maybe<Array<Maybe<Vote>>>;
};

export type EventPlayer = {
  __typename?: 'EventPlayer';
  player?: Maybe<PlaterData>;
  status?: Maybe<PlayerStatus>;
};

export type EventResult = {
  __typename?: 'EventResult';
  opponentGoals: Scalars['Int'];
  teamGoals: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCompetition?: Maybe<Competition>;
};


export type MutationCreateCompetitionArgs = {
  name: Scalars['String'];
};

export type PlaterData = {
  __typename?: 'PlaterData';
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
};

export type Player = {
  __typename?: 'Player';
  email: Scalars['String'];
  events?: Maybe<Array<Maybe<Event>>>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  number: Scalars['Int'];
  receivedVotes?: Maybe<Array<Maybe<Vote>>>;
  stats?: Maybe<Array<Maybe<PlayerStats>>>;
  submitedVotes?: Maybe<Array<Maybe<Vote>>>;
  team?: Maybe<Team>;
  teamId: Scalars['Int'];
};

export type PlayerStats = {
  __typename?: 'PlayerStats';
  assists: Scalars['Int'];
  event?: Maybe<Event>;
  eventId: Scalars['Int'];
  goals: Scalars['Int'];
  id: Scalars['ID'];
  player?: Maybe<Player>;
  playerId: Scalars['Int'];
  redCards: Scalars['Int'];
  seasonId: Scalars['Int'];
  yellowCards: Scalars['Int'];
};

export enum PlayerStatus {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Pending = 'PENDING'
}

export type Query = {
  __typename?: 'Query';
  events?: Maybe<Array<Maybe<Event>>>;
};


export type QueryEventsArgs = {
  input: QueryByGroupAndSeasonInput;
};

export type QueryByGroupAndSeasonInput = {
  groupId: Scalars['Int'];
  seasonId: Scalars['Int'];
};

export type Team = {
  __typename?: 'Team';
  groupId: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  owned: Scalars['Boolean'];
  players?: Maybe<Array<Maybe<Player>>>;
};

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['ID'];
  owner?: Maybe<Player>;
  ownerId: Scalars['Int'];
  player?: Maybe<Player>;
  playerId: Scalars['Int'];
  points: Scalars['Int'];
};

export type GetAllEventsQueryVariables = Exact<{
  input: QueryByGroupAndSeasonInput;
}>;


export type GetAllEventsQuery = { __typename?: 'Query', events?: Array<{ __typename?: 'Event', id: string, isHome: boolean, teamId: number, opponentId: number, competition?: { __typename?: 'Competition', name: string } | null, team?: { __typename?: 'Team', name: string } | null, opponent?: { __typename?: 'Team', name: string } | null, result?: { __typename?: 'EventResult', teamGoals: number, opponentGoals: number } | null } | null> | null };


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