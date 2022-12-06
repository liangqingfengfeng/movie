import GlobalLoading from '@/components/GlobalLoading';
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.less';
import routers from './router';
import store from './store';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {routers.map(({ path, component: RouterComponent }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<GlobalLoading />}>
                  <RouterComponent />
                </Suspense>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </Provider>,
  );
}
