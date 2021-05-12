import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from './../services/auth';
import Frontpage from './../pages/Frontpage/index'
import Home from './../pages/Home/index'
import Login from './../components/Login/index';
import Register from './../components/Register/index';
import ResetPassword from './../components/ResetPassword/index';
import ResetPasswordForm from './../components/ResetPasswordForm/index';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Frontpage} />
            <Route path="/cadastro" component={Register} />
            <Route path="/login" component={Login} />
<<<<<<< HEAD
            <PrivateRoute path="/app" component={Home} />
=======
            <Route path="/reset" component={ResetPassword} />
            <Route path="/password/reset/:id" component={ResetPasswordForm} />
            <PrivateRoute path="/app" component={() => <h1>App</h1>} />
>>>>>>> 8dcc2b4246460183aab0693ebd5d7eb40b3d8d5b
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;