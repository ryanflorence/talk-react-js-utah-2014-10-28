/** @jsx React.DOM */
var React = require('react');
var fullName = require('../lib/fullName');

var Contact = module.exports = React.createClass({

  getInitialState: function() {
    return {
      showEditing: false
    };
  },

  startEditing: function() {
    this.setState({ showEditing: true });
  },

  saveEdits: function(event) {
    event.preventDefault();
    var elements = this.refs.form.getDOMNode().elements;
    var contact = [].filter.call(elements, function(element) {
      return element.getAttribute('name');
    }).reduce(function(contact, element) {
      contact[element.getAttribute('name')] = element.value;
      return contact;
    }, {id: this.props.contact.id});
    this.props.onEdit(contact);
    this.setState({showEditing: false});
  },

  cancelEdits: function(event) {
    event.preventDefault();
    this.setState({showEditing: false});
  },

  renderInfo: function() {
    var contact = this.props.contact;
    return (
      <div className="KVSet">
        <div className="KV">
          <div className="KV__Key">First Name</div>
          <div className="KV__Value">{contact.first}</div>
        </div>
        <div className="KV">
          <div className="KV__Key">Last Name</div>
          <div className="KV__Value">{contact.last}</div>
        </div>
        <div className="KV">
          <div className="KV__Key">Avatar URL</div>
          <div className="KV__Value">{contact.avatar}</div>
        </div>
        <div className="KV">
          <div className="KV__Key"></div>
          <div className="KV__Value">
            <a onClick={this.startEditing} href="#">edit</a>
          </div>
        </div>
      </div>
    );
  },

  renderEditing: function() {
    var contact = this.props.contact;
    return (
      <div className="KVSet">
        <div className="KV">
          <div className="KV__Key">First Name</div>
          <div className="KV__Value">
            <input name="first" defaultValue={contact.first}/>
          </div>
        </div>
        <div className="KV">
          <div className="KV__Key">Last Name</div>
          <div className="KV__Value">
            <input name="last" defaultValue={contact.last}/>
          </div>
        </div>
        <div className="KV">
          <div className="KV__Key">Avatar URL</div>
          <div className="KV__Value">
            <input name="avatar" defaultValue={contact.avatar}/>
          </div>
        </div>
        <div className="KV">
          <div className="KV__Key"></div>
          <div className="KV__Value">
            <button type="button" onClick={this.cancelEdits}>cancel</button>{' '}
            <button type="submit">save</button>
          </div>
        </div>
      </div>
    );
  },

  render: function() {
    var contact = this.props.contact;
    return (
      <div className="Contact">
        <h1 className="Heading Heading--alt">{fullName(contact)}</h1>
        <div className="Content padBox">
          <div className="center">
            <img className="Avatar" key={contact.id} src={contact.avatar}/>
          </div>
          <form ref="form" onSubmit={this.saveEdits}>
            {this.state.showEditing ? this.renderEditing() : this.renderInfo()}
          </form>
        </div>
      </div>
    );
  }
});

