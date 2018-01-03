import dispatcher from "../dispatcher";
import axios from "axios";
import ContactStore from "../stores/ContactStore";

const axiosInstance = axios.create({
      //baseURL: 'http://127.0.0.1:8529/_db/_system/react-contacts/contacts' // Foxx
      baseURL: 'http://localhost:8088/api/' // ASP.NET CORE
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

export function loginUser(user) {
  
  const { name, password } = user; // Destructuring...  ES2015... https://babeljs.io/docs/learn-es2015/ 

  axiosInstance.post('auth/token', { 
      email: name, 
      password: password
  })
  .then(function(response){
    console.log(response.data); 
    console.log(response.status);
    
    localStorage.setItem('jwt', response.data.token);
    dispatcher.dispatch({type: "LOGIN_USER", jwt: response.data.token });
  })
  .catch(function (response) {
    console.log(response);
    console.log(response.status); 
    //dispatcher.dispatch({type: "ERROR_LOGIN_USER", contacts: response });
  });  
}

export function register(user) {
  
  const { email, password, confirmPassword } = user;

  axiosInstance.post('auth/register', { 
      email: email, 
      password: password,
      confirmPassword: confirmPassword
  })
  .then(function(response){
    console.log(response.data); 
    console.log(response.status);    
  })
  .catch(function (response) {
    console.log(response);
    console.log(response.status); 
  });  
}

export function createContact(contact) {
  
  const { id, name, email, address, phone } = contact;

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt');
  axiosInstance.post('contacts', {
      userEmail: ContactStore._user.email, 
      name: name, 
      email: email, 
      address: address, 
      phone: phone 
  })
  .then(function(response){
    console.log(response.data); 
    console.log(response.status);     
    dispatcher.dispatch({type: "CREATE_CONTACT", contact: response.data });
  })
  .catch(function (response) {
    console.log(response);
    console.log(response.status); 
    dispatcher.dispatch({type: "ERROR_CREATE_CONTACT", contacts: response });
  });  
}

export function reloadContactsFilteredBy(filter, value) {
  
 axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt');
 axiosInstance.get('contacts/' + filter + '?value=' + value)
   .then(function(response){
     //console.log(response.data); 
     console.log(response.status);
     if (response.data.indexOf("<!DOCTYPE html>") === -1)     
       dispatcher.dispatch({type: "RECEIVE_CONTACTS", contacts: response.data });
   })
   .catch(function (response) {
     console.log(response);
     console.log(response.status); 
     dispatcher.dispatch({type: "ERROR_RECEIVE_CONTACTS", contacts: response });
 });    
}

///////////////////////////////////////////////////////////////////////////////////////
//  NOT SUPPORTED / NOT USING
//////////////////////////////////////////////////////////////////////////////////////

// export function deleteContact(id) {
  
//   axiosInstance.delete('contacts', {
//     params: {
//       ID: id
//     }
//   })
//   .then(function(response){
//     console.log(response.data); 
//     console.log(response.status);     
//     dispatcher.dispatch({type: "DELETE_CONTACT", contacts: response.data });
//   })
//   .catch(function (response) {
//     console.log(response);
//     console.log(response.status); 
//     dispatcher.dispatch({type: "ERROR_DELETE_CONTACT", contacts: response });
//   });    
// }

// export function updateContact(contact) {
   
//   const { id, name, email, address, phone } = contact; 

//   axiosInstance.put('contacts', {
//       id: id, 
//       name: name, 
//       email: email, 
//       address: address, 
//       phone: phone 
//   })
//   .then(function(response){
//     console.log(response.data); 
//     console.log(response.status);     
//     dispatcher.dispatch({type: "UPDATE_CONTACT", contacts: response.data });
//   })
//   .catch(function (response) {
//     console.log(response);
//     console.log(response.status); 
//     dispatcher.dispatch({type: "ERROR_UPDATE_CONTACT", contacts: response });
//   });  
// }

// export function reloadContacts() {
   
//   //dispatcher.dispatch({type: "FETCH_CONTACTS"});
//   axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwt');
//   axiosInstance.get('contacts')
//     .then(function(response){
//       //console.log(response.data); 
//       console.log(response.status);
//       if (response.data.indexOf("<!DOCTYPE html>") === -1)     
//         dispatcher.dispatch({type: "RECEIVE_CONTACTS", contacts: response.data });
//     })
//     .catch(function (response) {
//       console.log(response);
//       console.log(response.status); 
//       dispatcher.dispatch({type: "ERROR_RECEIVE_CONTACTS", contacts: response });
//   });    
// }