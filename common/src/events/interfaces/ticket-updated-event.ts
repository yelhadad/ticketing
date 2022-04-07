import { Subjects } from "../subjects";
import { BaseEvent } from "./base-event";

export interface TicketUpdatedEvent extends BaseEvent {
  subject: Subjects.ticketUpdated,
  data: {
    id: string,
    title: string,
    price: number,
    userId: string 
  }
}