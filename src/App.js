import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Login from "./LoginPage";
import Dashboard from "./Dashboard";
import TaskDetails from "./TaskDetails";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      <ProtectedRoute exact path="/task/:id" component={TaskDetails} />
      <Redirect to="/login" />
    </Switch>
  </BrowserRouter>
);

export default App;