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

  handleContactEdit(editedContact) {
    var contacts = this.state.contacts;
    contacts.forEach(function(contact, index) {
      if (contact.id === editedContact.id)
        contacts[index] = editedContact;
    });
    this.setState({ contacts: contacts });
    req.put(`${HOST}/contacts/${editedContact.id}`, {contact: editedContact});
  },

  renderMaster() {
    return this.state.contactsLoaded ?
      <ContactList contacts={this.state.contacts}/> :
      <div>Loading ...</div>;
  },

  renderDetail() {
    return this.state.contactsLoaded && this.props.activeRouteHandler({
      contacts: this.state.contacts,
      onEdit: this.handleContactEdit
    });
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
          {this.renderDetail()}
        </div>
      </div>
    );
  }
});

