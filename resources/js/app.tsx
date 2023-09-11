import './bootstrap';
import '../css/app.css';

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
            <App {...props} />
          </ContextPageProvider>
        </Provider>
        ,
      </RouteContext.Provider>,
    );
  },
});
