import React, {ReactNode} from 'react';
import {RenderError} from '../../generic/error';
import {Switch, Route, RouteProps, useLocation} from 'wouter';

const routes: RouteProps[] = [];
let notFound: ReactNode;

export function Router() {
  useLocation();
  try {
    return (
      <Switch>
        <>
          {routes.map((route: RouteProps, index: number) => (
            <Route key={index} {...route} />
          ))}
        </>
        <>
          <Route>{notFound ?? '404'}</Route>
        </>
      </Switch>
    );
  } catch {
    return <RenderError />;
  }
}

export function setURL(url: string, component: ReactNode): void {
  routes.push({
    path: `/${url}`,
    children: <div>{component}</div>,
  });
}

export function setNotFound(component: ReactNode) {
  notFound = component;
}
