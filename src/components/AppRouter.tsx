import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import { privateRoutes, publicRoutes, RouteNames } from '../routes';
import { useSelector } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';

const AppRouter = () => {
   const {isAuth} = useTypedSelector((state) => state.auth);
   return (isAuth
      ? (
         <Switch>
            {privateRoutes.map((route) => (
               <Route {...route} key={route.path} />
            ))}
            <Redirect to={RouteNames.EVENT} />
         </Switch>
      )
      : (
         <Switch>
            {publicRoutes.map((route) => (
               <Route {...route} key={route.path} />
            ))}
            <Redirect to={RouteNames.LOGIN} />
         </Switch>

      )
   );
};

export default AppRouter;