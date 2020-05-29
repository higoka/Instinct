import { Link } from 'react-router-dom';
import { GuestLayout } from 'components';
import { SessionContext } from 'app/context';
import { defaultLoginState, LoginState } from './';
import React, { useContext, useState } from 'react';
import { Card, ConfigContext, Form, Icon, Loading, redirect, setURL } from 'instinct-frontend';

setURL('login', <Login />);

export function Login() {
  const configContext = useContext(ConfigContext);
  const sessionContext = useContext(SessionContext);
  const [state, setState] = useState<LoginState>(defaultLoginState);

  const keysToCheck: Array<keyof LoginState> = ['username', 'password'];

  const isDisabled: boolean = !!keysToCheck.find((key) => state[key] === '') || state.showSpinner;

  function setValue<T extends keyof LoginState>(key: T, value: LoginState[T]): void {
    setState({
      ...state,
      [key]: value,
    });
  }

  async function tryLogin(): Promise<void> {
    try {
      setState({
        ...state,
        error: undefined,
        showSpinner: true,
      })
      await sessionContext.login(state.username!, state.password!);
      redirect('home');
    } catch (error) {
      setState({
        ...state,
        error: error.message,
        showSpinner: false,
      })
    }
  }

  return (
    <GuestLayout>
      <div>
        <h2>Login</h2>
        <p>Welcome to {configContext.siteName}. If you are a current member, please sign in below.</p>
      </div>
      <Card className="w-100">
        <Loading isLoading={state.showSpinner} text="Attempting to login...">
          <Form className="guest-form" onSubmit={tryLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                className={`form-control ${state.error === 'invalid_username' ? 'border-danger' : ''}`}
                placeholder="John-Doe"
                value={state.username}
                onChange={(e) => setValue('username', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className={`form-control ${state.error === 'invalid_password' ? 'border-danger' : ''}`}
                type="password"
                value={state.password}
                onChange={(e) => setValue('password', e.target.value)}
              />
            </div>
            <div className="row">
              <div className="col-6 mt-2">
                <Link className="guest-link" to="/register">
                  <Icon family="fas" type="question-circle" />
                  New Player?
                </Link>
              </div>
              <div className="col-6 text-right">
                <button className="btn btn-success" disabled={isDisabled} type="submit">
                  Let's Go
                </button>
              </div>
            </div>
          </Form>
        </Loading>
      </Card>
    </GuestLayout>
  );
}
