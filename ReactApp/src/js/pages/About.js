
import React from "react";


//////////////////////////////////////////////////////////////////////////////////////////////////
//
//
//  FOLLOWING HTML WAS QUICK AND DIRTY CONVERSION FROM WORD TO HTML USING http://wordtohtml.net/ 
//
//
//////////////////////////////////////////////////////////////////////////////////////////////////


export default class About extends React.Component {
  render() {
    return (
     
      <div>
          <h1>MyContacts was built with the following:</h1>
      
          <p>&nbsp;</p>
          <p><strong>Front End &nbsp;&ndash; with VS Code</strong>&nbsp; <a href="https://code.visualstudio.com/">https://code.visualstudio.com/</a></p>
          <p>&nbsp;</p>
          <ul>
          <li>React, Flux, React Router</li>
          <li>Bootstrap with <a href="https://bootswatch.com/cerulean/">https://bootswatch.com/cerulean/</a></li>
          <li>Babeljs for ES2015 features <a href="https://babeljs.io/docs/learn-es2015/">https://babeljs.io/docs/learn-es2015/</a></li>
          <li>Webpack</li>
          <li>Webpack-Dev-Server</li>
          <li>axios for promise based HTTP client <a href="https://github.com/mzabriskie/axios">https://github.com/mzabriskie/axios</a>&nbsp;</li>
          <li>Nodejs Event Emitter - used in the Store part of the Flux pattern</li>
          <li>lodash <a href="https://lodash.com/docs">https://lodash.com/docs</a>&nbsp; &nbsp;</li>
          <li>react-validation-mixin for validation  <a href="https://github.com/jurassix/react-validation-mixin">https://github.com/jurassix/react-validation-mixin</a>&nbsp; &nbsp;</li>
          <li>lodash <a href="https://lodash.com/docs">https://lodash.com/docs</a>&nbsp; &nbsp;</li>
          <li>Tests...in progress</li>
          </ul>
          <p>&nbsp;</p>
          <p><strong>Back End - with VS 2015</strong></p>
          <p>&nbsp;</p>
          <ul>
          <li>Katana: Microsoft's implementation of OWIN (Open Web Interface for .Net) to self-host the Web API framework
          <ul>
          <li>The server is using localhost:9000; CORS enabled to avoid Access-Control-Allow-Origin errors</li>
          </ul>
          </li>
          <li>SimpleInjector <a href="https://github.com/simpleinjector/SimpleInjector/">https://github.com/simpleinjector/SimpleInjector/</a> &nbsp;</li>
          <li>Tests...in progress</li>
          </ul>
          <p>&nbsp;&nbsp;&nbsp;</p>
          <p><strong>Trouble shooting tools</strong></p>
          <p>&nbsp;</p>
          <ul>
          <li>Fiddler</li>
          <li>Beyond Compare</li>
          <li>Agent Ransack</li>
          </ul>
          <p>&nbsp;</p>
          
      </div>
          
      
    );
  }
}
