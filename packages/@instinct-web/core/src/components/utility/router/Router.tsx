import React, {ReactNode} from 'react';
import {Switch, Route, RouteProps} from 'wouter';

const routes: RouteProps[] = [];
let notFound: ReactNode;

export function Router() {
  return (
    <Switch>
      <>
        {routes.map(route => (
          <Route key={`route_${route.path}`} {...route} />
        ))}
      </>
      <>
        <Route>{notFound ?? '404'}</Route>
      </>
    </Switch>
  );
}

export function setURL(url: string, component: ReactNode): void {
  routes.push({
    path: `/${url}`,
    children: <>{component}</>,
  });
}

export function setNotFound(component: ReactNode) {
  notFound = component;
}
