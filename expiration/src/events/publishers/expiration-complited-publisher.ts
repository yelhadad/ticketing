import { Publisher, ExpirationCompletedEvent, Subjects } from "@ye-ticketing/common";

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompletedEvent> {
  subject: Subjects.ExpirationCompleted = Subjects.ExpirationCompleted;
}