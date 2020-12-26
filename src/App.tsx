import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import store from "./redux/ReduxStore";
import { Result } from "antd";
import { TestAppContainer } from "./components/TestApp/TestAppContainer";

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <TestAppContainer />} />
      <Route
        path="*"
        render={() => (
          <Result
            status="404"
            title="404"
            subTitle="К сожалению, посещенная вами страница не существует."
            extra={<Link to="/">Домой</Link>}
          />
        )}
      />
    </Switch>
  );
};

const AppConteiner = compose<React.ComponentType>(
  withRouter,
  connect(null, null)
)(App);
export const MainApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppConteiner />
      </Provider>
    </BrowserRouter>
  );
};
export default MainApp;
