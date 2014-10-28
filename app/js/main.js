/** @jsx React.DOM */
var React = require('react');
var {Routes, Route, DefaultRoute} = require('react-router');

var routes = (
  <Routes>
    <Route handler={require('./components/App')}>
      <DefaultRoute name="home" handler={require('./components/Home')}/>
      <Route name="contact" path="contact/:id" handler={require('./components/Contact')}/>
    </Route>
  </Routes>
);

React.renderComponent(routes, document.body);

