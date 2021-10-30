import app from './app';
import connectToDataBase from './configurations/connect';
import envConfig from './configurations/envConfig';

connectToDataBase();

app.listen(envConfig.PORT, () => (
  console.log(`Node listening on port ${envConfig.PORT}`)
));

