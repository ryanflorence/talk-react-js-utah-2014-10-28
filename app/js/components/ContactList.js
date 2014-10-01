/** @jsx React.DOM */
var React = require('react');


var ContactList = module.exports = React.createClass({

  select: function(contact) {
    this.props.onSelect(contact);
  },

  render: function() {
    var contacts = this.props.contacts.map(function(contact) {
      return (
        <li key={contact.id}>
          <a
            className="ContactList__Contact"
            href="#"
            onClick={this.select.bind(this, contact)}
          >
            {contact.first} {contact.last}
          </a>
        </li>
      );
    }, this);
    return (
      <ul className="ContactList">
        {contacts}
      </ul>
    );
  }
});
