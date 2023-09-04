import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      title: 'Supply Chain tracking and tracing',
      version: '1.0.0',
      description: 'APIs for Supply chain tracking and tracing',
    },
  },
  apis: ['./src/openapi.yaml'], // Path to your OpenAPI specification file
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
