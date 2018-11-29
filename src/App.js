import React, { Component, Suspense, lazy } from "react";
import { hot } from "react-hot-loader";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import Kitty from "./components/Kitty";
import Housemates from "./components/Housemates";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1> Ahoy, World! </h1>
          {/* <Housemates /> */}
          <Kitty />
        </div>
      </ApolloProvider>
    );
  }
}

export default hot(module)(App);
