# ReactContactsApp

MyContacts was built with the following:
 

Front End  – with VS Code  https://code.visualstudio.com/


React, Flux, React Router

Bootstrap with https://bootswatch.com/cerulean/

Babeljs for ES2015 features https://babeljs.io/docs/learn-es2015/

Webpack

Webpack-Dev-Server

axios for promise based HTTP client https://github.com/mzabriskie/axios 

Nodejs Event Emitter - used in the Store part of the Flux pattern

lodash https://lodash.com/docs   

react-validation-mixin for validation https://github.com/jurassix/react-validation-mixin 

lodash https://lodash.com/docs   


Back End - with VS 2015


Katana: Microsoft's implementation of OWIN (Open Web Interface for .Net) to self-host the Web API framework

The server is using localhost:9000; CORS enabled to avoid Access-Control-Allow-Origin errors

SimpleInjector https://github.com/simpleinjector/SimpleInjector/  





# Fieldset Component

The `<Fieldset>` component is a way to contain related fields; it's useful when creating **reusable groups of controls**. Here's an example of how Fieldset is used in the JSX of the ThreePartDate component, which could be used in something like a BirthDate component:

### Fieldset example:
```
<Fieldset>
  <label>First name: <input type="text" /></label>
  <label>Middle initial: <input type="text" /></label>
  <label>Last name: <input type="text" /></label>
</Fieldset>
```

### Fieldset with a legend

```
<Fieldset legend="Please enter your name">
  <label>First name: <input type="text" /></label>
  <label>Middle initial: <input type="text" /></label>
  <label>Last name: <input type="text" /></label>
</Fieldset>
```    

# Prop Types

## `legend="..."` (not required)
_(string)_: Legend Text displayed above the Fieldset’s children.

## `legendClass="..."` (not required)
_(string)_ The JSX className for the legend`component.





















