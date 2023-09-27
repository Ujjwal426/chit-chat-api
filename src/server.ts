import { ValidateEnv } from '@utils/validateEnv';
import App from './app';
import { AuthRoute, UserRoute, ChatRoute, MessageRoute } from './routes';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new ChatRoute(), new MessageRoute()]);


app.listen();
