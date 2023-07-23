import express from 'express';
import { DB_URL, NODE_ENV, PORT } from '@config';
import { connect } from 'mongoose';

class App {
  public app: express.Application;

  public env: string;

  public port: number;

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = Number(PORT || '9000');

    // Disable the class-methods-use-this rule for the connectToDatabase method
    // @ts-ignore
    this.connectToDatabase();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on the http://localhost:${this.port}`);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private connectToDatabase() {
    // Use 'this' to call class properties or methods (even if none are used in this case)
    connect(DB_URL)
      .then(() => {
        console.log('Connected.....');
      })
      .catch(err => {
        console.log(err.message);
      });
  }
}

export default App;
