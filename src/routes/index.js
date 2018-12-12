import React from "react";
import { Route, Router } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import history from "./history";
import Nav from "../components/common/Nav";
import KittyParser from "../components/Kitty/KittyParser";
import KittyStatements from "../components/Kitty/KittyStatements";
import Housemates from "../components/Housemates";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

export const makeMainRoutes = () => {
  return (
    <ApolloProvider client={client}>
      <Nav history={history} />
      <Router history={history}>
        <div>
          <Route exact path="/" component={KittyStatements} />
          <Route path="/kitty-parser" component={KittyParser} />
          <Route path="/housemates" component={Housemates} />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default makeMainRoutes;
