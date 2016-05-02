
import React from "react";

export default class Contact extends React.Component {
 
  constructor(props) {  
    super();
    
    const { id, name, email, address, phone } = props;
    
    
      this.state = {
        contact: {
          id: id,
          name: name,
          email: email,
          address: address,
          phone: phone
        }
      };
  }

                            
  handleChange(e) {

    switch(e.target.id) {
        case "name":
          this.state.contact.name = e.target.value;
          break;
        case "email":
          this.state.contact.email = e.target.value;
          break;
        case "address":
          this.state.contact.address = e.target.value;
          break;
        case "phone":
          this.state.contact.phone = e.target.value;
          break;
    }
    
  }
  
  updateContact() {
    this.props.updateContact(this.state.contact);
  }
  
  deleteContact() {

    if (confirm("Are you sure you want to delete " + this.state.contact.name + "?")) {
      this.props.deleteContact(this.props.id);
    }
   
  }
  
  editContact() {
    this.props.editContact(this.props.id);   
  }
  
  cancelEdit() {
    this.props.cancelEdit(this.props.id);   
  }


  render() {
    const { id, edit, name, email, address, phone } = this.props;
          
    if (edit) {
      return (
                 
              <div class="col-sm-6 col-md-4">
                <div class="thumbnail">         
                  <div class="caption">
                    <p><b>Name:  </b><input maxLength="20" type="text" onChange={this.handleChange.bind(this)} id="name" placeholder={name} focus="focused"/></p>
                    <p><b>Email:  </b><input maxLength="30" type="email" onChange={this.handleChange.bind(this)} id="email" placeholder={email} focus="focused"/></p>
                    <p><b>Address:  </b><input maxLength="30" type="text" onChange={this.handleChange.bind(this)} id="address" placeholder={address} focus="focused"/></p>
                    <p><b>Phone:  </b><input maxLength="10" type="tel"  onChange={this.handleChange.bind(this)} id="phone" placeholder={phone} focus="focused"/></p>
                    <p><a href="#" class="btn btn-primary" role="button" onClick={this.updateContact.bind(this)}>Apply</a> 
                       <a href="#" class="btn btn-default" role="button" onClick={this.cancelEdit.bind(this)}>Cancel</a></p>
                </div>
              </div>
            </div>       
       
      );
    }
 
    return (
            
           <div class="col-sm-6 col-md-4">
              <div class="thumbnail">         
                <div class="caption">
                  <h3>{name}</h3>
                  <p><b>Email:  </b>{email}</p>
                  <p><b>Address:  </b>{address}</p>
                  <p><b>Phone:  </b>{phone}</p>
                  <p><a href="#" class="btn btn-primary" role="button" onClick={this.editContact.bind(this)}>Edit</a> 
                     <a href="#" class="btn btn-danger" role="button"  onClick={this.deleteContact.bind(this)}>Delete</a></p>
              </div>
            </div>
          </div>   
  
   );
    
    
  }
}

