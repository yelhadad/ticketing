import { Subjects, Publisher, PaymentCreatedEvent } from '@ye-ticketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.paymentCreated = Subjects.paymentCreated;
}
