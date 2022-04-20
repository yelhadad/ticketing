import { Subjects } from "../subjects";
import { OrderStatus } from "../types/order-status";
import { BaseEvent } from "./base-event";

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    userId: string;
    // we know its date but we coverting data to json so this 
    // property should be string.
    expiresAt: string;
    status: OrderStatus;
    version: number;
    ticket: {
      title: string;
      price: number;
      id: string;
    }; 
  }
}