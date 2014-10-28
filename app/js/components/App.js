/** @jsx React.DOM */
var React = require('react');
var req = require('../lib/req');
var HOST = 'http://addressbook-api.herokuapp.com';
var ContactList = require('./ContactList');
var Contact = require('./Contact');

var App = module.exports = React.createClass({
  getInitialState() {
    return {
      contacts: [],
      contactsLoaded: false
    };
  },

  componentDidMount() {
    req.get(HOST+'/contacts', this.onReceiveContacts);
  },

  onReceiveContacts(err, res) {
    this.setState({
      contactsLoaded: true,
      contacts: res.contacts
    });
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

