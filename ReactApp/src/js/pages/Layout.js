import React from "react";
import { Link } from "react-router";

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";

export default class Layout extends React.Component {
  render() {
    const { location } = this.props; // "snatch" location from props; inject location into Nav component below
    const containerStyle = {
      marginTop: "60px"
    };


    // NOTE: injecting Layout's location into Nav; used for setting the active css class in the Nav component
    // Info: React will inject child components into  {this.props.children} 
    return (
      <div>

        <Nav location={location} /> 

        <div class="container" style={containerStyle}>
          <div class="row">
            <div class="col-lg-12">

              {this.props.children}  

            </div>
          </div>
          <Footer/>
        </div>
      </div>

    );
  }
}
