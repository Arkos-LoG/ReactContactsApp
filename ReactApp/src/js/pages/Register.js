import {PropTypes, findDOMNode } from "react";
import React from "react";
import * as ContactActions from "../actions/ContactActions"; 
import Joi from 'joi';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import classnames from 'classnames';

export default class Register extends React.Component {
    
 constructor() {  
    super();
      this.state = {
        user: {}
      };
   
   // VALIDATION STUFF 
   this.validatorTypes = {
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().required().label('Password'),
      confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('ConfirmPassword')  
    };
    this.getValidatorData = this.getValidatorData.bind(this);
    this.renderHelpText = this.renderHelpText.bind(this);
    this.getClasses = this.getClasses.bind(this);    
  }
     
  // VALIDATION STUFF 
  getValidatorData() {
    return {
      email: findDOMNode(this.refs.email).value,
      password: findDOMNode(this.refs.password).value,
      confirmPassword: findDOMNode(this.refs.confirmPassword).value
    };
  }
   
  createContact() {
       
    // VALIDATION STUFF      
    const onValidate = (error) => {
      if (error) {
        //form has errors; do not submit
      } else {
        //no errors; continue...
         
        ContactActions.register(this.state.user);
        this.props.history.pushState(null, "/login");
      }
    };
    
    // VALIDATION STUFF 
    this.props.validate(onValidate);                
  } 
    
  handleChange(e) {

    switch(e.target.id) {
        case "email":
          this.state.user.email = e.target.value;
          break;
        case "password":
          this.state.user.password = e.target.value;
          break;
        case "confirmPassword":
          this.state.user.confirmPassword = e.target.value;
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
                                <h1>Register</h1>
                            </div>
                            <div class="form-bottom contact-form">                                                                                      
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
                                <div className={this.getClasses('password')}>                                     
                                    <input type="password" 
                                        maxLength="30" 
                                        onChange={this.handleChange.bind(this)} 
                                        placeholder="Password..." 
                                        class="form-control" 
                                        id="password"
                                        onBlur={this.props.handleValidation('password')} 
                                        ref='password'
                                    />
                                    {this.renderHelpText(this.props.getValidationMessages('password'))}
                                </div>
                                <div className={this.getClasses('confirmPassword')}>                                     
                                    <input type="password" 
                                        maxLength="30" 
                                        onChange={this.handleChange.bind(this)} 
                                        placeholder="Confirm Password..." 
                                        class="form-control" 
                                        id="confirmPassword"
                                        onBlur={this.props.handleValidation('confirmPassword')} 
                                        ref='confirmPassword'
                                    />
                                    {this.renderHelpText(this.props.getValidationMessages('confirmAddress'))}
                                </div>                           
                                <button class="btn btn-primary" onClick={this.createContact.bind(this)}>Register</button>                            
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
Register.propTypes = {
  errors: PropTypes.object,
  validate: PropTypes.func,
  isValid: PropTypes.func,
  handleValidation: PropTypes.func,
  getValidationMessages: PropTypes.func,
  clearValidations: PropTypes.func,
};

module.exports = validation(strategy)(Register);