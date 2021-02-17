require("dotenv").config();
const http = require("http");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");
const helmet = require("helmet");
const queryString = require("qs-middleware");
const { ApolloServer, PubSub } = require("apollo-server-express");
const mongoose = require("./config/mongoose");
const logger = require("./config/logger");
const { env, logs, port, graphql } = require("./config/vars");
const resolvers = require("./resolvers");
const { readFileSync } = require("fs");

mongoose.connect();

const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
// app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(queryString());

const server = new ApolloServer({
  typeDefs: readFileSync("./schema.graphql").toString(),
  resolvers,
  context: {
    pubsub: new PubSub(),
  },
});

server.applyMiddleware({ app, path: graphql.path });

const httpServer = http.createServer(app);

server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
  logger.info(`Server ready at http://localhost:${port}${server.graphqlPath}`);
  logger.info(
    `Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
  );
});
// app.listen(port, () => logger.info(`Server started on port ${port} (${env}).`));
