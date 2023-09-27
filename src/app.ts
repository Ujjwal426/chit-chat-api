import express from 'express';
import { DB_URL, NODE_ENV, PORT } from '@config';
import { connect } from 'mongoose';
import { Routes } from '@interfaces';
import { ErrorMiddleware, NotFoundMiddleware } from '@middlewares';
import { Server as SocketIOServer } from 'socket.io';

class App {
  public app: express.Application;

  public env: string;

  public port: number;

  public io: SocketIOServer; // Add an 'io' property to the class

  constructor(roures: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = Number(PORT || '9000');

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(roures);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  public listen() {
    const server = this.app.listen(this.port, () => {
      console.log(`Server running on the http://localhost:${this.port}`);
    });
    this.io = new SocketIOServer(server, {
      pingTimeout: 60000,
      cors: {
        origin: 'http://localhost:3000',
      },
    });
    this.io.on('connection', socket => {
      console.log('conncted to socket.io');

      socket.on('setup', userData => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit('Connected....');
      });

      socket.on('join chat', room => {
        socket.join(room);
        console.log('User joined room' + room);
      });

      socket.on('new message', newMessageReceived => {
        var chat = newMessageReceived.chat;

        if (chat.users.length <= 0) {
          return console.log('Chat users not defined');
        }
        chat.users.forEach(user => {
          if (user == newMessageReceived.sender._id) {
            console.log('user', user);
            return;
          }
          console.log('newMessageReceived', newMessageReceived);
          socket.in(user).emit('message received', () => {
            console.log('Send Message');
          });
        });
      });
    });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/api', route.router);
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

  private initializeErrorHandling() {
    this.app.use(NotFoundMiddleware);
    this.app.use(ErrorMiddleware);
  }
}

export default App;
