/** @jsx React.DOM */
var React = require('react');
var fullName = require('../lib/fullName');
var getFormValues = require('../lib/getFormValues');

var Contact = module.exports = React.createClass({

  getInitialState() {
    return {
      showEditing: false,
      contact: this.findContact(this.props)
    };
  },

  findContact(props) {
    return props.contacts.filter(function(contact) {
      return contact.id === props.params.id
    })[0];
  },

  componentWillReceiveProps(newProps) {
    this.setState({contact: this.findContact(newProps)})
  },

  startEditing(event) {
    event.preventDefault();
    this.setState({ showEditing: true });
  },

  saveEdits(event) {
    event.preventDefault();
    var contact = getFormValues(this.refs.form.getDOMNode());
    contact.id = this.state.contact.id;
    this.props.onEdit(contact);
    this.setState({showEditing: false});
  },

  cancelEdits(event) {
    event.preventDefault();
    this.setState({showEditing: false});
  },

  renderInfo() {
    var contact = this.state.contact;
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

  renderEditing() {
    var contact = this.state.contact;
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

  render() {
    var contact = this.state.contact;
    if (!contact)
      return null;
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

