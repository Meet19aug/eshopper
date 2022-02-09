import React, {Fragment} from 'react'
import { useSelector } from 'react-redux' // to get information from redux store.
import {Navigate, Route} from "react-router-dom";

const ProtectedRoute = ({isAdmin , element: Component, ...res}) => { {/* We are taking all other paramenter than components in res array like  */}
    const {loading, isAuthenticated, user } = useSelector((state)=> state.user);
    return (
        <Fragment>
            {loading===false && (
                <Route {...res}
                render={(props)=>{
                    if(isAuthenticated===false){
                        return <Navigate to="/login"/>;
                    }
                    if(isAdmin === true && user.role !== "admin"){
                        return <Navigate to="/login"/>;
                    }
                    return <Component {...props}/>
                }}
                />
            )}
        </Fragment>
    )
}

export default ProtectedRoute
