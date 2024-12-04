import React from "react";
import { Navigate } from 'react-router-dom';
import { getTokens } from "../utils/auth";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const { accessToken } = getTokens();

    if (!accessToken) {
        // Redirect them to the login page
        return <Navigate to="/login" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProtectedRoute;
