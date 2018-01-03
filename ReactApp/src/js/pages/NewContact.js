import {PropTypes, findDOMNode } from "react";
import React from "react";
import * as ContactActions from "../actions/ContactActions"; 
import Joi from 'joi';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import classnames from 'classnames';

export default class NewContact extends React.Component {
    
 constructor() {  
    super();
      this.state = {
        contact: {}
      };
   
   // VALIDATION STUFF 
   this.validatorTypes = {
      name: Joi.string().required().label('Name'),
      email: Joi.string().email().required().label('Email'),
      address: Joi.string().required().label('Address'),
      phone: Joi.number().required().integer().min(10).label('Phone'),    
    };
    this.getValidatorData = this.getValidatorData.bind(this);
    this.renderHelpText = this.renderHelpText.bind(this);
    this.getClasses = this.getClasses.bind(this);    
  }
     
  // VALIDATION STUFF 
  getValidatorData() {
    return {
      name: findDOMNode(this.refs.name).value,
      email: findDOMNode(this.refs.email).value,
      address: findDOMNode(this.refs.address).value,
      phone: findDOMNode(this.refs.phone).value,
    };
  }
   
  createContact() {
       
    // VALIDATION STUFF      
    const onValidate = (error) => {
      if (error) {
        //form has errors; do not submit
      } else {
        //no errors; continue...
        
        this.state.contact.id = Date.now();
 
        ContactActions.createContact(this.state.contact);    
        this.props.history.pushState(null, "/");
      }
    };
    
    // VALIDATION STUFF 
    this.props.validate(onValidate);                
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
    
  render() {
            
    return (
            <div class="top-content">
             
            <div class="inner-bg">
                <div class="container">            
                    <div class="row">
                        <div class="col-sm-6 form-box">
                            <div class="form-top">
                                <h1>New Contact</h1>
                                <p>Fill in the form below to create a new contact:</p>
                            </div>
                            <div class="form-bottom contact-form">                                                         
                                <div className={this.getClasses('name')}>                                 
                                    <input type="text" 
                                        maxLength="20" 
                                        onChange={this.handleChange.bind(this)} 
                                        placeholder="Name..." 
                                        class="form-control" 
                                        id="name"
                                        onBlur={this.props.handleValidation('name')} 
                                        ref='name'
                                     />
                                     {this.renderHelpText(this.props.getValidationMessages('name'))}
                                </div>                                                                
                                <div className={this.getClasses('email')}>                                                                                                             
                                    <input type="email"
                                        maxLength="30" 
                                        onChange={this.handleChange.bind(this)} 
                                        placeholder="Email..." 
                                        class="form-control" 
                                        id="email"
                                        onBlur={this.props.handleValidation('email')} 
                                        ref='email'
                                     />
                                     {this.renderHelpText(this.props.getValidationMessages('email'))}
                                </div>                                                                
                                <div className={this.getClasses('address')}>                                     
                                    <input type="text" 
                                        maxLength="30" 
                                        onChange={this.handleChange.bind(this)} 
                                        placeholder="Address..." 
                                        class="form-control" 
                                        id="address"
                                        onBlur={this.props.handleValidation('address')} 
                                        ref='address'
                                    />
                                    {this.renderHelpText(this.props.getValidationMessages('address'))}
                                </div>                                
                                <div className={this.getClasses('phone')}>                                   
                                    <input  type="tel" 
                                        maxLength="10"  
                                        onChange={this.handleChange.bind(this)} 
                                        placeholder="Phone..." 
                                        class="form-control" 
                                        id="phone"
                                        onBlur={this.props.handleValidation('phone')} 
                                        ref='phone'
                                    />
                                    {this.renderHelpText(this.props.getValidationMessages('phone'))}
                                </div>

                                <button class="btn btn-primary" onClick={this.createContact.bind(this)}>Add</button>                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>             
        </div>
    );
  }

 // VALIDATION STUFF 
  renderHelpText(message) {
    return (
     <span className='help-block'>{message}</span>
    );
  }

 // VALIDATION STUFF 
  getClasses(field) {
    return classnames({
      'form-group': true,
      'has-error': !this.props.isValid(field)
    });
  }
  
}///////////////////////////////////////////////////////////////////////////////////
  
  
// VALIDATION STUFF 
NewContact.propTypes = {
  errors: PropTypes.object,
  validate: PropTypes.func,
  isValid: PropTypes.func,
  handleValidation: PropTypes.func,
  getValidationMessages: PropTypes.func,
  clearValidations: PropTypes.func,
};

module.exports = validation(strategy)(NewContact);