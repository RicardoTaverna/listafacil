import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from './../services/auth';
import Admin from './../pages/Admin'
import Frontpage from './../pages/Frontpage'
import Home from './../pages/Home'
import List from './../components/List';
import Login from './../components/Login';
import Register from './../components/Register';
import ResetPassword from './../components/ResetPassword';
import ResetPasswordForm from './../components/ResetPasswordForm';
import Search from './../components/Search';
import UniqueList from './../components/UniqueList';

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
            <Route exact path="/admin" component={Admin} />
            <Route path="/cadastro" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/reset" component={ResetPassword} />
            <Route path="/password/reset/:id" component={ResetPasswordForm} />
            <PrivateRoute exact path="/app" component={Home} />
            <PrivateRoute exact path="/lista" component={List} />
            <PrivateRoute exact path="/lista/:id" component={UniqueList} />
            <PrivateRoute exact path="/busca" component={Search} />
            <Route path="*" component={() => <h1>Page not found</h1>} />

        </Switch>
    </BrowserRouter>
);

export default Routes;