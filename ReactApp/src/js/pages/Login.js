import {PropTypes, findDOMNode } from "react";
import React from "react";
//import * as LoginActions from "../actions/LoginActions";
import * as ContactActions from "../actions/ContactActions"; 
import Joi from 'joi';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import classnames from 'classnames';

export default class Login extends React.Component {
    
 constructor() {  
    super();
      this.state = {
        user: {} // ?????????
      };
   
   // VALIDATION STUFF 
   this.validatorTypes = {
      name: Joi.string().required().label('Name'),
      password: Joi.string().required().label('Password'),
    };
    this.getValidatorData = this.getValidatorData.bind(this);
    this.renderHelpText = this.renderHelpText.bind(this);
    this.getClasses = this.getClasses.bind(this);
    
  }
     
  // VALIDATION STUFF 
  getValidatorData() {
    return {
      name: findDOMNode(this.refs.name).value,
      password: findDOMNode(this.refs.password).value,
    };
  }
   
  login() {
       
    // VALIDATION STUFF      
    const onValidate = (error) => {
      if (error) {
        //form has errors; do not submit
      } else {
        //no errors; continue...
        
        //this.state.contact.id = Date.now();
 
        //LoginActions.loginUser(this.state.user);
        ContactActions.loginUser(this.state.user);    
        //this.props.history.pushState(null, "/");
      }
    };
    
    // VALIDATION STUFF 
    this.props.validate(onValidate);                
  } 
    
  handleChange(e) {

    switch(e.target.id) {
        case "name":
          this.state.user.name = e.target.value;
          break;
        case "password":
          this.state.user.password = e.target.value;
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
                                <h1>Login</h1>
                            </div>
                            <div class="form-bottom contact-form">                                                         
                                <div className={this.getClasses('name')}>                                 
                                    <input type="text" 
                                        maxLength="20" 
                                        onChange={this.handleChange.bind(this)} 
                                        placeholder="Username..." 
                                        class="form-control" 
                                        id="name"
                                        onBlur={this.props.handleValidation('name')} 
                                        ref='name'
                                     />
                                     {this.renderHelpText(this.props.getValidationMessages('name'))}
                                </div>                                                                                                                   
                                <div className={this.getClasses('password')}>                                     
                                    <input type="text" 
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
                                <button class="btn btn-primary" onClick={this.login.bind(this)}>Submit</button>                            
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
Login.propTypes = {
  errors: PropTypes.object,
  validate: PropTypes.func,
  isValid: PropTypes.func,
  handleValidation: PropTypes.func,
  getValidationMessages: PropTypes.func,
  clearValidations: PropTypes.func,
};

module.exports = validation(strategy)(Login);