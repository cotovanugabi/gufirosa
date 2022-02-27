import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";

const typeDefs = /* GraphQL */ `
  type Competition {
    id: Int!
    name: String!
    groupId: Int!
  }

  type Player {
    id: Int!
    firstName: String!
    lastName: String!
    number: Int!
    email: String!
    image: String
    teamId: Int!
    team: Team!
    events: [Event]
    stats: [PlayerStats]
    receivedVotes: [Vote]
    submitedVotes: [Vote]
  }

  type PlaterData {
    id: Int!
    firstName: String!
    lastName: String!
    number: Int!
  }

  type PlayerStats {
    id: Int!
    goals: Int!
    assists: Int!
    redCards: Int!
    yellowCards: Int!
    playerId: Int!
    eventId: Int!
    firstName: String!
    lastName: String!
  }

  type Team {
    id: Int!
    name: String!
    owned: Boolean!
    groupId: Int!
    players: [Player!]
  }

  type Event {
    id: Int!
    isHome: Boolean!
    seasonId: Int!
    groupId: Int!
    competitionId: Int!
    teamId: Int!
    opponentId: Int!
    competition: Competition!
    team: Team!
    opponent: Team!
    result: EventResult
    stats: [PlayerStats!]
    players: [EventPlayer!]
    votes: [Vote!]
  }

  type EventPlayer {
    player: PlaterData!
    status: PlayerStatus!
  }

  type EventResult {
    teamGoals: Int!
    opponentGoals: Int!
  }

  type Vote {
    id: Int!
    ownerId: Int!
    playerId: Int!
    owner: Player!
    player: Player!
    points: Int!
  }

  ########## Enums
  enum PlayerStatus {
    PENDING
    ACCEPTED
    DECLINED
  }

  ########## Inputs
  input CreateEventInput {
    seasonId: Int!
    groupId: Int!
    competitionId: Int!
    teamId: Int!
    opponentId: Int!
    isHome: Boolean!
  }
  input QueryByGroupAndSeasonInput {
    seasonId: Int!
    groupId: Int!
  }
  input QueryEventInput {
    eventId: Int!
  }
  input QueryEventStatsInput {
    eventId: Int!
  }
  input SubmitEventsStatsInput {
    players: [EventStats!]
  }
  input EventStats {
    id: Int
    goals: Int!
    assists: Int!
    redCards: Int!
    yellowCards: Int!
    playerId: Int!
    eventId: Int!
  }

  ########### Queries
  type Query {
    events(input: QueryByGroupAndSeasonInput!): [Event]
    event(input: QueryEventInput!): Event
    eventStats(input: QueryEventStatsInput!): [PlayerStats!]
  }
  type Mutation {
    createCompetition(name: String!): Competition
    submitEventStats(input: SubmitEventsStatsInput!): [PlayerStats!]
  }
`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
