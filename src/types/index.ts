import { GetEventQuery } from "../graphql/generated/api";

export type EventType = NonNullable<GetEventQuery["event"]>;
export type PlayersType = NonNullable<EventType["players"]>;
export type PlayerType = NonNullable<PlayersType[number]>;
