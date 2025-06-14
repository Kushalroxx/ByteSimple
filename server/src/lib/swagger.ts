// swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'zero2one API Docs',
      version: '1.0.0',
      description: 'API documentation for zero2one backend',
    },
    servers: [{ url: 'http://localhost:3000/' }],
  },
  apis: ['./src/routes/auth/*.ts', './src/routes/basic/*.ts', './src/routes/user/*.ts', './src/routes/subadmin/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
