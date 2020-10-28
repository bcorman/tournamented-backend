rerimport express from 'express';
import { urlencoded, json } from 'body-parser';
import morgan from 'morgan';
import { createServer } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import router from './router';
import { connect } from 'mongoose';
const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use(urlencoded({ extended: false }));
app.use(json({ type: '*/*' }));

router(app);
const port = process.env.PORT || 3090;
const server = createServer(app);

server.listen(port, () => console.log('Server connected'));

console.log(`Server listening on: ${port}`);

app.use((err, req, res) => {
  console.log(err.stack);
  res.status(500).send('What have you done...');
});

app.use((req, res) => res.status(404).send('Not found...'));

connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/debate-club', {
  useNewUrlParser: true,
});
