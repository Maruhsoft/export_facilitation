const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BrandApe API',
      version: '1.0.0',
      description: 'API documentation for the BrandApe export trade facilitation system.',
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Development server'
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./backend/routes/*.js', './backend/docs/*.js'], // Path to the API docs and schemas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
