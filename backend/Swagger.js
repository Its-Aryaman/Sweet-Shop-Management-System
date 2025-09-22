import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sweet Shop Management System API',
      version: '1.0.0',
      description:
        'API for managing sweets inventory, user authentication, and purchases in a sweet shop system.',
      contact: {
        name: 'API Developer',
        email: 'dev@sweetshop.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
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
  apis: ['./routes/*.js'], // Path to the API routes folder
};

const specs = swaggerJsdoc(options);

const swaggerSetup = (app) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCss: `
        .swagger-ui .topbar { background-color: #563d7c; }
        .swagger-ui .topbar-wrapper img { display: none; }
        .swagger-ui .topbar-wrapper span { color: white; font-weight: bold; }
      `,
      customSiteTitle: 'Sweet Shop API Docs',
    })
  );
};

export default swaggerSetup;
