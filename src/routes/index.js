import React from "react";
import { Route, Router } from "react-router-dom";
import ApolloClient from "apollo-boost";
import createHistory from "history/createBrowserHistory";
import { ApolloProvider } from "react-apollo";
import Nav from "../components/common/Nav";

import KittyParser from "../components/Kitty/KittyParser";
import KittyStatements from "../components/Kitty/KittyStatements";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const Home = () => <h2>Home</h2>;

export const makeMainRoutes = () => {
  return (
    <ApolloProvider client={client}>
      <Nav />
      <Router history={createHistory()}>
        <div>
          <Route exact path="/" component={KittyStatements} />
          <Route path="/kitty-parser" component={KittyParser} />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default makeMainRoutes;
