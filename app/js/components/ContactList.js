/** @jsx React.DOM */
var React = require('react');
var {Link} = require('react-router');
var fullName = require('../lib/fullName');

var ContactList = module.exports = React.createClass({

  render: function() {
    var contacts = this.props.contacts.map(function(contact) {
      return (
        <li key={contact.id}>
          <Link
            className="ContactList__Contact"
            to="contact"
            params={contact}
          >{fullName(contact)}</Link>
        </li>
      );
    });

    return (
      <ul className="ContactList">
        {contacts}
      </ul>
    );
  }
});
