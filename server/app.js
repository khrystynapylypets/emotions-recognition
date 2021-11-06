import express from 'express';
import cors from 'cors';
import routes from './routes';
import envConfig from './configurations/envConfig';
import { handleError } from './error';

const app = express();

app.use(express.json());

app.use(express.static(__dirname));

app.use(cors({
  origin: envConfig.FRONT_DOMAIN,
  exposedHeaders: [ 'access-token' ],
}));


app.use('/', routes);

app.use((err, req, res, next) => {
  handleError(err, res);
});

export default app;
