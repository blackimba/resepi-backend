import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Recipe API',
            version: '1.0.0',
        }
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};

export default setupSwagger;