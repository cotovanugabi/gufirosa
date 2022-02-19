import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";

const typeDefs = /* GraphQL */ `
  type Competition {
    id: ID!
    name: String!
    groupId: Int!
  }

  type Player {
    id: ID!
    firstName: String!
    lastName: String!
    number: Int!
    email: String!
    image: String
    teamId: Int!
    team: Team
    events: [Event]
    stats: [PlayerStats]
    receivedVotes: [Vote]
    submitedVotes: [Vote]
  }

  type PlaterData {
    id: Int!
    firstName: String!
    lastName: String!
  }

  type PlayerStats {
    id: ID!
    goals: Int!
    assists: Int!
    redCards: Int!
    yellowCards: Int!
    playerId: Int!
    seasonId: Int!
    eventId: Int!
    player: Player
    event: Event
  }

  type Team {
    id: ID!
    name: String!
    owned: Boolean!
    groupId: String!
    players: [Player]
  }

  type Event {
    id: ID!
    isHome: Boolean!
    seasonId: Int!
    groupId: Int!
    competitionId: Int!
    teamId: Int!
    opponentId: Int!
    competition: Competition
    team: Team
    opponent: Team
    result: EventResult
    stats: [PlayerStats]
    players: [EventPlayer]
    votes: [Vote]
  }

  type EventPlayer {
    player: PlaterData
    status: PlayerStatus
  }

  type EventResult {
    teamGoals: Int!
    opponentGoals: Int!
  }

  type Vote {
    id: ID!
    ownerId: Int!
    playerId: Int!
    owner: Player
    player: Player
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

  ########### Queries
  type Query {
    events(input: QueryByGroupAndSeasonInput!): [Event]
  }
  type Mutation {
    createCompetition(name: String!): Competition
  }
`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
