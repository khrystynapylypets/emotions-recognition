import express from 'express';
import routes from './routes';
import { handleError } from './error';

const app = express();

app.use(express.json());
app.use('/', routes);

app.use((err, req, res, next) => {
  handleError(err, res);
});

export default app;
