import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import Home from "./Home";

import PrivateRoute from "./PrivateRoute";

import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import {AuthProvider} from "../contexts/AuthContext";


import Stocks from "./Stocks";
import Mutual from "./Mutual"
import Gold from "./Gold";
import Investment from "./Investment";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/home" component={Home} />

          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/stocks" component={Stocks} />
          <PrivateRoute exact path="/mutual" component={Mutual} />
          <PrivateRoute exact path="/gold" component={Gold} />
          <PrivateRoute exact path="/investment" component={Investment} />
          
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
