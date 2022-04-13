import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan

  get client() {
    if (!this._client) {
      throw new Error('client can be defind only after connecting to NATS')
    }
    return this._client;
  }

  connect(clusterID: string, clientID: string, url: string): Promise<void> {
    this._client = nats.connect(
      clusterID, clientID,
       {url})
       return new Promise((resolve, reject) => {
        this.client.on('connect', () => {
          console.log('Listener connected to NATS')
          resolve();
          this.client.on('error', (err: Error) => {
            reject(err)
          })
        })
     })
  }

}

const natsWrapper = new NatsWrapper();
export { natsWrapper };