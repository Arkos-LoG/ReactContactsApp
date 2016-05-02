import dispatcher from "../dispatcher";
import axios from "axios";

const axiosInstance = axios.create({
      baseURL: 'http://localhost:9000'
  });
  
  
////////////////////////////////////////////////////////////////////////////////
//  ACTIONS
///////////////////////////////////////////////////////////////////////////////


export function editContact(id) {
    
  dispatcher.dispatch({
    type: "EDIT_CONTACT",
    id,
  });
  
}

export function cancelEditContact(id) {
  
  dispatcher.dispatch({
    type: "CANCEL_EDIT",
    id,
  });
}


export function createContact(contact) {
  
  const { id, name, email, address, phone } = contact; // Destructuring...  ES2015... https://babeljs.io/docs/learn-es2015/ 

  axiosInstance.post('/api/contact', {
      id: id, 
      name: name, 
      email: email, 
      address: address, 
      phone: phone 
  })
  .then(function(response){
    console.log(response.data); 
    console.log(response.status);     
    dispatcher.dispatch({type: "CREATE_CONTACT", contacts: response.data });
  })
  .catch(function (response) {
    console.log(response);
    console.log(response.status); 
    dispatcher.dispatch({type: "ERROR_CREATE_CONTACT", contacts: response });
  });
  
}


export function deleteContact(id) {
  
  axiosInstance.delete('/api/contact', {
    params: {
      ID: id
    }
  })
  .then(function(response){
    console.log(response.data); 
    console.log(response.status);     
    dispatcher.dispatch({type: "DELETE_CONTACT", contacts: response.data });
  })
  .catch(function (response) {
    console.log(response);
    console.log(response.status); 
    dispatcher.dispatch({type: "ERROR_DELETE_CONTACT", contacts: response });
  });
    
}

export function updateContact(contact) {
   
  const { id, name, email, address, phone } = contact; 

  axiosInstance.put('/api/contact', {
      id: id, 
      name: name, 
      email: email, 
      address: address, 
      phone: phone 
  })
  .then(function(response){
    console.log(response.data); 
    console.log(response.status);     
    dispatcher.dispatch({type: "UPDATE_CONTACT", contacts: response.data });
  })
  .catch(function (response) {
    console.log(response);
    console.log(response.status); 
    dispatcher.dispatch({type: "ERROR_UPDATE_CONTACT", contacts: response });
  });
  
}


export function reloadContacts() {
   
  dispatcher.dispatch({type: "FETCH_CONTACTS"});
  
  axiosInstance.get('/api/contact')
    .then(function(response){
      console.log(response.data); 
      console.log(response.status);     
      dispatcher.dispatch({type: "RECEIVE_CONTACTS", contacts: response.data });
    })
    .catch(function (response) {
      console.log(response);
      console.log(response.status); 
      dispatcher.dispatch({type: "ERROR_RECEIVE_CONTACTS", contacts: response });
  });
    
 
}


