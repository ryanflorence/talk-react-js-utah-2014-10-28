/** @jsx React.DOM */
var React = require('react');
var req = require('../lib/req');
var HOST = 'http://addressbook-api.herokuapp.com';
var ContactList = require('./ContactList');
var ContactStore = require('../stores/ContactStore');

var App = module.exports = React.createClass({
  getInitialState() {
    return this.getStateFromStore()
  },

  getStateFromStore() {
    return ContactStore.getState()
  },

  componentDidMount() {
    ContactStore.load();
    ContactStore.addChangeListener(this.handleStoreChange);
  },

  handleStoreChange() {
    this.setState(this.getStateFromStore());
  },

  renderMaster() {
    return this.state.contactsLoaded ?
      <ContactList contacts={this.state.contacts}/> :
      <div>Loading ...</div>;
  },

  render() {
    return (
      <div className="App">
        <div className="Master">
          <h2 className="Heading">Contacts</h2>
          <div className="Content">
            {this.renderMaster()}
          </div>
        </div>
        <div className="Detail">
          {this.props.activeRouteHandler()}
        </div>
      </div>
    );
  }
});

