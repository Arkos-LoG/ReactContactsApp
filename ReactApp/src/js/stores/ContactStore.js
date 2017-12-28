import { EventEmitter } from "events";  // built into Nodejs for doing -> this.emit("change");
import _ from "lodash";
import jwt_decode from 'jwt-decode';

import dispatcher from "../dispatcher";

class ContactStore extends EventEmitter {
  constructor() {
    super()
    this.contacts = []; // set to empty array until Action dispatches RECEIVE_CONTACTS

    this._user = null;
    this._jwt = null;
  }
  
  updateEditStatusForContact(id, edit)
  {
    var match = _.find(this.contacts, function(item) { return item.id === id })
    if (match) {
        match.edit = edit;
    }
     
     this.emit("change");
  }
  
  getAll() {
    if (this.contacts.length > 1)
      return this.contacts.sort(this.compare);
    else
      return this.contacts; 
  }

  /// FOR LOGIN /////////
  isLoggedIn() {
    return !!this._user;
  }

  handleActions(action) {
    
    switch(action.type) {
        case "CREATE_CONTACT": 
          this.contacts.push(action.contact); // = action.contacts;
          this.emit("change");          
          break;
        case "RECEIVE_CONTACTS": 
          this.contacts = action.contacts;
          this.emit("change");
          break;
        case "DELETE_CONTACT": 
          this.contacts = action.contacts;
          this.emit("change");
          break;
        case "UPDATE_CONTACT": 
          this.contacts = action.contacts;
          this.updateEditStatusForContact(action.id, false);
          this.emit("change");
          break; 
        case "EDIT_CONTACT":  
          this.updateEditStatusForContact(action.id, true);
          break;
        case "CANCEL_EDIT":  
          this.updateEditStatusForContact(action.id, false);
          break;
        
        case "LOGIN_USER":
          this._jwt = action.jwt;
          this._user = jwt_decode(this._jwt);
          //this.emitChange();
          this.emit("change");
          break;
        case "LOGOUT_USER":
          //this._user = null;
          //this.emitChange();
          break;
      }      
  }

  // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/ 
  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
  
    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }
}

const contactStore = new ContactStore;
dispatcher.register(contactStore.handleActions.bind(contactStore));

export default contactStore;  // make available for import for Contacts to subscribe to events