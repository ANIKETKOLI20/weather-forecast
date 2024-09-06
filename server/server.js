import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schemas/index.js'; // Import GraphQL schema definitions
import resolvers from './resolvers/index.js'; // Import GraphQL resolvers
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve('.env') });

const app = express(); // Initialize Express app

// Initialize Apollo Server with type definitions and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }) // Context setup for requests
});

async function startServer() {
  // Start the Apollo server
  await server.start();
  
  // Apply middleware to connect Apollo Server with Express app
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000; // Set server port from environment or default to 4000
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`); // Log server startup message
  });
}

// Start the server and catch any startup errors
startServer().catch((error) => {
  console.error('Error starting server:', error);
});
