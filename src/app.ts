import express from 'express';

import routes from './routes';
import userRouter from './routes/userRoutes';
import categoryRouter from './routes/categoryRoutes';
import setupSwagger from './config/swagger';

const app = express();

// Middleware setup
app.use(express.json());

// Routes setup
app.use('/api', routes);
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);

setupSwagger(app);

export default app;