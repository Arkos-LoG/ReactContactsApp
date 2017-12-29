// reference for component...Mount etc.
// http://facebook.github.io/react/docs/component-specs.html#mounting-componentdidmount 

import React from "react";
import { Link } from "react-router";
import AuthenticatedComponent from '../components/AuthenticatedComponent';

import Contact from "../components/Contact";
import * as ContactActions from "../actions/ContactActions"; // import * as -> Import an entire module's contents.  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import 
import ContactStore from "../stores/ContactStore";

// Contacts component

export default AuthenticatedComponent(class Contacts extends React.Component {
//export default class Contacts extends React.Component {
  constructor() {
    super();
    this.getContacts = this.getContacts.bind(this);
    this.state = {
      contacts: ContactStore.getAll()
    };
     
  }
  
/////////////////////////////////////////////
//  STORE UPDATE CALLS & EVENT LISTENERS
////////////////////////////////////////////

  componentWillMount() {
    ContactStore.on("change", this.getContacts);
  }

  // prevent memory leaks...
  componentWillUnmount() {
    ContactStore.removeListener("change", this.getContacts);
  }

  getContacts() {
    this.setState({
      contacts: ContactStore.getAll(),
    });
    
  }

/////////////////////////////////////////////
//  ACTION CALLS
////////////////////////////////////////////

// Fetch data here according to https://facebook.github.io/react/tips/initial-ajax.html 
  componentDidMount() {
    ContactActions.reloadContacts();  // Flux pattern -> tell Action to go get the contacts from Web API after rendering occurs; then,
  }                                   //                 action will send a dispatch to the store, which will create change event which this component is listening for

  updateContact(contact) {
    ContactActions.updateContact(contact); 
  }

  deleteContact(id) {
    ContactActions.deleteContact(id);   
  }
  
  editContact(id) {
    ContactActions.editContact(id);   
  }
  
  cancelEdit(id) {
    ContactActions.cancelEditContact(id);   
  }

/////////////////////////////////////////////
//  RENDER
////////////////////////////////////////////

  render() {
    
    const { contacts } = this.state;
 
    // map contacts "snatched" from state to ContactComponents
    const ContactComponents = contacts.map((contact) => {
                                        
                     // inject into Contact props...   we are binding to the context of Contacts who is in charge of sending Actions to Action
        return <Contact updateContact={this.updateContact.bind(this)} 
                        cancelEdit={this.cancelEdit.bind(this)} 
                        editContact={this.editContact.bind(this)} 
                        deleteContact={this.deleteContact.bind(this)} 
                        key={contact.id} {...contact}/>; 
                                 // NOTE: ... means inject all the other properties into Contact; Contact's props -> { edit, email, name, etc. }
    });

    return (
      <div>        
        {ContactComponents}
        <p style={{marginBottom:'10px', marginTop:'10px'}}><Link to="newContact"><u><b>New Contact</b></u></Link></p>
      </div>
    );
  }
}

// new
);

