import React from "react";
import { Route, Router } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import KittyParser from "../components/Kitty/KittyParser";
import history from "./history";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const Home = () => <h2>Home</h2>;

export const makeMainRoutes = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/kitty-parser" component={KittyParser} />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default makeMainRoutes;
