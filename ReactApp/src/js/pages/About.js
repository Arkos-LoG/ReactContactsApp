
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
          <h1>This sample app features the following:</h1>
      
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <b><ul>
          <li>React (using Flux pattern)</li>
          <li>JWT Authentication</li>
          <li>ASP.Net Core 1.1</li>
          <li>ASP.Net Core Identity and Driver for ArangoDB by Border East on github</li>
          <li>...and of course ArangoDB</li>
          </ul></b>    
      </div>                
    );
  }
}
