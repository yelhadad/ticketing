import { Subjects } from "../subjects";
import { BaseEvent } from "./base-event";

export interface TicketCreatedEvent extends BaseEvent {
  subject: Subjects.ticketCreated;
  data: {
    id: string,
    title: string,
    price: number,
    userId: string
    version: number;
  }
};