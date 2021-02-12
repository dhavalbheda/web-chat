import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({Component, path, ...rest}) => {
    const { authenticated } = useSelector(state => state.User);

    return <Fragment>
        {!authenticated
        ? (<Redirect to="/signin" />)
        : <Route exact {...rest} path={path} render={Component} />
        }
    </Fragment>
}
export default PrivateRoute