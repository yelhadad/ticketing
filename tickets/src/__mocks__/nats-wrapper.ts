// this is a fake file
// the purpse of this file is to treak the test evirorment that nats server exists.

export const natsWrapper = {
  client:{
    publish: (subject: string, data: string, callback: () => void) => {
      callback();
    }
 }
};