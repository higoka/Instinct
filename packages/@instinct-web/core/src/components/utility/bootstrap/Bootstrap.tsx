import {Router} from '../router';
import {DataPolling} from '../data-polling';
import {ToastContainer} from 'react-toastify';
import {BannedGuard} from '../../guard/banned';
import {useBanListener} from '../../../hooks/user';
import {SkeletonTheme} from 'react-loading-skeleton';
import {configContext} from '../../../context/config';
import {healthContext} from '../../../context/health';
import {configService} from '../../../services/config';
import {sessionContext} from '../../../context/session';
import {sessionService} from '../../../services/session';
import {RenderError} from '../../generic/error/RenderError';
import React, {useContext, useEffect, useState} from 'react';
import {StripeProvider} from '../stripe-provider/StripeProvider';
import {ServerMaintenanceGuard} from '../../guard/server-maintenance';
import {Icon} from '../../generic/icon';

export function Bootstrap() {
  useBanListener();
  const [ready, setReady] = useState(false);
  const [failedToLaunch, setFailedToLaunch] = useState(false);
  const {setConfig} = useContext(configContext);
  const {setHealth} = useContext(healthContext);
  const {setUser} = useContext(sessionContext);

  useEffect(() => {
    async function init() {
      try {
        const [user, config, health] = await Promise.all([
          sessionService.init(),
          configService.getConfig(),
          configService.getHealth(),
        ]);

        setUser(user);
        setConfig(config);
        setHealth(health);
        setReady(true);
      } catch {
        setReady(true);
        setFailedToLaunch(true);
      }
    }

    init();
  }, []);

  if (!ready) {
    return <i className="fa fa-spin fa-spinner" />;
  }

  if (failedToLaunch) {
    return (
      <div className="text-center">
        <h2 className="text-danger text-uppercase" style={{marginTop: '15%'}}>
          <Icon type="exclamation-triangle" />
          Failed to Launch
        </h2>
        <h4>There was a problem. Please try again later.</h4>
      </div>
    );
  }

  try {
    return (
      <React.StrictMode>
        <SkeletonTheme color="#0f416d" highlightColor="#1a4d6e">
          <ToastContainer />
          <ServerMaintenanceGuard>
            <BannedGuard>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  minHeight: '100%',
                  minWidth: '100%',
                }}
              >
                <Router />
                <DataPolling />
              </div>
            </BannedGuard>
          </ServerMaintenanceGuard>
        </SkeletonTheme>
      </React.StrictMode>
    );
  } catch {
    return <RenderError />;
  }
}
