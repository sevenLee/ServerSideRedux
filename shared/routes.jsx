import React                   from 'react';
import { Route, IndexRoute }   from 'react-router';
import MainView from 'components/MainView';
import ThemeIndex from 'components/ThemeIndex';
import AnotherView from 'components/AnotherView';
import App from 'components/App';


export default (
    <Route component={App} path="/">
      <Route component={MainView} path="main">
        <IndexRoute component={ThemeIndex}></IndexRoute>
      </Route>
      <Route component={AnotherView} path="themePreview" />
    </Route>
);
