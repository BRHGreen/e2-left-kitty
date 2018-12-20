import React, { Component } from "react";
import { hot } from "react-hot-loader";
import makeMainRoutes from "./routes/index";

class App extends Component {
  render() {
    return makeMainRoutes();
  }
}

export default hot(module)(App);
