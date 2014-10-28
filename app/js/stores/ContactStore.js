/** @jsx */
var HOST = 'http://addressbook-api.herokuapp.com';
var req = require('../lib/req');
var EventEmitter = require('events').EventEmitter;
var mergeInto = require('react/lib/mergeInto');

var events = new EventEmitter();

var state = {
  contactsLoaded: false,
  contacts: []
};

var ContactStore = {

  getState() {
    return state;
  },

  load() {
    req.get(`${HOST}/contacts`, function(err, res) {
      setState({ contactsLoaded: true, contacts: res.contacts });
      notifyChange();
    });
  },

  findById (id) {
    return state.contacts.filter(function(contact) {
      return contact.id === id
    })[0];
  },

  addChangeListener(fn) {
    events.addListener('change', fn);
  },

  removeChangeListener(fn) {
    events.removeChangeListener('change', fn);
  }

};

function notifyChange() {
  events.emit('change');
}

function setState(newState) {
  mergeInto(state, newState);
}

module.exports = ContactStore;

