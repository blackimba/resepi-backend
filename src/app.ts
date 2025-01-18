import express from 'express';

import routes from './routes';


const app = express();

// Middleware setup
app.use(express.json());

// Routes setup
app.use('/api', routes);

export default app;