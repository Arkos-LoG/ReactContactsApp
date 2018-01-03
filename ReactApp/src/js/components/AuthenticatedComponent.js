import React from 'react';
import ContactStore from "../stores/ContactStore";

export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {

    constructor() {
      super()
      this.state = this.getLoginState();
    }

    getLoginState() {
      return {
        userLoggedIn: ContactStore.isLoggedIn(),
        user: ContactStore.user,
        jwt: ContactStore.jwt
      };
    }

    componentDidMount() {
      ContactStore.on("change", this.onChange.bind(this));
    }

    onChange() {
      this.setState(this.getLoginState.bind(this));
    }

    componentWillUnmount() {
      ContactStore.removeListener("change", this.onChange.bind(this));
    }

    render() {

      if (!ContactStore.isLoggedIn()) {
        this.props.history.pushState(null, "/login");
        return null;
      }

      return (
        <ComposedComponent
          {...this.props}
          user={this.state.user}
          jwt={this.state.jwt}
          userLoggedIn={this.state.userLoggedIn} />
        );        
      }
  }
};