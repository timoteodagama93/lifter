import './bootstrap';
import '../css/app.css';
import '../css/effectsCards.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { RouteContext } from '@/Hooks/useRoute';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Provider } from 'react-redux';
import store from './redux/store.jsx';
const appName =
  window.document.getElementsByTagName('title')[0]?.innerText || 'Lifter';
import { ContextPageProvider } from './contexts/PaginaActualContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

window.fbAsyncInit = function () {
  FB.init({
    appId: '1588022325068116',
    xfbml: true,
    version: 'v18.0',
  });
  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

createInertiaApp({
  title: title => `${title} - ${appName}`,
  progress: {
    color: '#f6cc33',
  },
  resolve: name =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    return root.render(
      <RouteContext.Provider value={(window as any).route}>
        <Provider store={store}>
          <ContextPageProvider>
            <GoogleOAuthProvider clientId="25634857848-og7fntsgnhe06le8nfi4de2uenmgbi1t.apps.googleusercontent.com">
              <App {...props} />
            </GoogleOAuthProvider>
          </ContextPageProvider>
        </Provider>
        ,
      </RouteContext.Provider>,
    );
  },
});
