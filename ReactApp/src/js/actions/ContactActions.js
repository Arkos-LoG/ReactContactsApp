import dispatcher from "../dispatcher";
import axios from "axios";

const axiosInstance = axios.create({
      baseURL: 'http://127.0.0.1:8529/_db/_system/react-contacts/contacts' // Foxx
      //baseURL: 'http://localhost:8088/api/contacts' // ASP.NET CORE
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

  axiosInstance.post('', {
      //id: id, 
      name: name, 
      email: email, 
      address: address, 
      phone: phone 
  })
  .then(function(response){
    console.log(response.data); 
    console.log(response.status);     
    dispatcher.dispatch({type: "CREATE_CONTACT", contact: response.data });//contacts: response.data });
  })
  .catch(function (response) {
    console.log(response);
    console.log(response.status); 
    dispatcher.dispatch({type: "ERROR_CREATE_CONTACT", contacts: response });
  });  
}

export function deleteContact(id) {
  
  axiosInstance.delete('', {
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

  axiosInstance.put('', {
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
  
  axiosInstance.get('')
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