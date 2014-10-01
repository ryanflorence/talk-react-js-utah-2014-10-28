/** @jsx React.DOM */
var React = require('react');
var req = require('../lib/req');
var HOST = 'http://addressbook-api.herokuapp.com';
var ContactList = require('./ContactList');
var Contact = require('./Contact');

var App = module.exports = React.createClass({
  getInitialState: function() {
    return {
      contacts: [],
      contactsLoaded: false,
      currentContact: null
    };
  },

  componentDidMount: function() {
    req.get(HOST+'/contacts', this.onReceiveContacts);
  },

  onReceiveContacts: function(err, res) {
    this.setState({
      contactsLoaded: true,
      contacts: res.contacts
    });
  },

  handleContactSelect: function(contact) {
    this.setState({
      currentContact: contact
    });
  },

  handleContactEdit: function(editedContact) {
    var contacts = this.state.contacts;

    contacts.forEach(function(contact, index) {
      if (contact.id === editedContact.id)
        contacts[index] = editedContact;
    });

    this.setState({
      contacts: contacts,
      currentContact: editedContact
    });

    req.put(HOST+'/contacts/'+editedContact.id, {contact: editedContact});
  },

  renderMaster: function() {
    return this.state.contactsLoaded ?
      <ContactList
        onSelect={this.handleContactSelect}
        contacts={this.state.contacts}
      /> :
      <div>Loading ...</div>;
  },

  renderDetail: function() {
    return this.state.currentContact ?
      <Contact contact={this.state.currentContact} onEdit={this.handleContactEdit} /> :
      <h2 className="Heading Heading--alt">Welcome!</h2>;
  },

  render: function() {
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

