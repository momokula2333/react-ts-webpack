import * as React from 'react';
import * as ReactDom from 'react-dom';
import { AppContainer } from "react-hot-loader";
import './app.css';
import App from "./App";

const rootEl = document.getElementById('root');

ReactDom.render(
  <AppContainer>
    <App/>
  </AppContainer>,
  rootEl);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require<any>("./App").default;
    ReactDom.render(
      <AppContainer>
        <NextApp />
      </AppContainer>
      ,
      rootEl
    );
  });
}
