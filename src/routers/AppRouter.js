import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import EmployeesPage from "../pages/EmployeesPage.jsx";

export default function AppRouter(props) {
  const { changeMenuAndAppBarVisibility } = props;
  return (
    <Router>
      <Switch>
        <Route path="/CreateEmployee" exact component={LoginPage} />
        <Route path="/CreateEmployeeType" exact component={LoginPage} />
        <Route path="/Employees" exact component={EmployeesPage} />
        <Route path="/" exact>
          <LoginPage
            changeMenuAndAppBarVisibility={changeMenuAndAppBarVisibility}
          />
        </Route>
        <Route path="*" component={NotFoundPage}>
          <NotFoundPage
            changeMenuAndAppBarVisibility={changeMenuAndAppBarVisibility}
          />
        </Route>
      </Switch>
    </Router>
  );
}

function LoginContainer() {
  <div>
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <Route path="/login" component={LoginPage} />
  </div>;
}

function DefaultContainer() {}
