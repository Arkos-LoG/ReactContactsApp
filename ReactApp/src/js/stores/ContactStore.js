import { EventEmitter } from "events";  // built into Nodejs for doing -> this.emit("change");
import _ from "lodash";

import dispatcher from "../dispatcher";

class ContactStore extends EventEmitter {
  constructor() {
    super()
    this.contacts = []; // set to empty array until Action dispatches RECEIVE_CONTACTS
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
    return this.contacts.sort(this.compare);
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