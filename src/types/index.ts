import { GetEventQuery } from "../graphql/generated/api";

export type EventType = NonNullable<GetEventQuery["event"]>;
