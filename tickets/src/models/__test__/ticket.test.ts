import { Ticket } from "../ticket";

it('throws error if ticket with the wrong version saves in the database', async () => {
  // create new Ticket

  const ticket = Ticket.build({
    userId: 'dfsjbjdbufd',
    price: 32,
    title: 'yoav'
  });

  await ticket.save();

  // fetch two tickets

const firstInstance = await Ticket.findById(ticket.id);
const secondInstance = await Ticket.findById(ticket.id);

// make changes to the instances

firstInstance!.set({price: 32})
secondInstance!.set({price: 332})

await firstInstance!.save();

// expect to recieve an error

try {
  await secondInstance!.save();
} catch (error) {
  return ;
}

throw new Error("test didn't work as expected");

});


it('changes versions of the doocument', async () => {
  const ticket = Ticket.build({
    title: 'sfdbf',
    price: 242,
    userId: 'sfbhju'
  });

  await ticket.save();
  expect(ticket!.version).toEqual(0);
  await ticket.save();
  expect(ticket!.version).toEqual(1);

})

