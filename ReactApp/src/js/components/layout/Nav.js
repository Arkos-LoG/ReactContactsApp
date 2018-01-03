import React from "react";
import { IndexLink, Link } from "react-router";
import ContactStore from "../../stores/ContactStore";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed; // simply inverts when onClick occurs
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;  // injected from Layout
    const { collapsed } = this.state;
    const contactsClass = location.pathname === "/" ? "active" : "";
    const newContactClass = location.pathname.match(/^\/newContact/) ? "active" : "";
    const aboutClass = location.pathname.match(/^\/about/) ? "active" : "";
    const loginClass = location.pathname.match(/^\/login/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    if (ContactStore.isLoggedIn()) {
      return (
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav">
                <li class={contactsClass}>
                  <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Contacts</IndexLink>
                </li>
                {/* <li class={newContactClass}>
                  <Link to="newContact" onClick={this.toggleCollapse.bind(this)}>New Contact</Link>
                </li> */}
                <li class={aboutClass}>
                  <Link to="about" onClick={this.toggleCollapse.bind(this)}>About</Link>
                </li>
                <li class={loginClass}>
                  <Link to="login" onClick={this.toggleCollapse.bind(this)}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }

    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              {/* <li class={contactsClass}>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Contacts</IndexLink>
              </li> */}
              {/* <li class={newContactClass}>
                <Link to="newContact" onClick={this.toggleCollapse.bind(this)}>New Contact</Link>
              </li> */}
              <li class={aboutClass}>
                <Link to="about" onClick={this.toggleCollapse.bind(this)}>About</Link>
              </li>
              <li class={loginClass}>
                <Link to="login" onClick={this.toggleCollapse.bind(this)}>Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}