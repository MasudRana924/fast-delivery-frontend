import React from 'react';
import { useSelector } from "react-redux";
import { redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    return (
        <> { loading === false && (
            <Route
                {...rest}
                render={(props) => {
                    if (isAuthenticated === false) {
                        return redirect("/login");
                    }

                    if (isAdmin === true && user.role !== "admin") {
                        return redirect("/login");
                    }

                    return <Component {...props} />;
                }}
            />
        )}</>
       
    );
};

export default ProtectedRoute;