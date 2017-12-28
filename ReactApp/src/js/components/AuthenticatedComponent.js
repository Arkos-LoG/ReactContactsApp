import React from 'react';

//import LoginStore from '../stores/LoginStore';
import ContactStore from "../stores/ContactStore";

export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {

    // static willTransitionTo(transition) {
    //   //if (!LoginStore.isLoggedIn()) {
    //   if (!ContactStore.isLoggedIn()) {
    //     transition.redirect('/login', {}, {'nextPath' : transition.path});
    //   }
    // }

    constructor() {
      super()
      this.state = this.getLoginState();
    }

    getLoginState() {
      return {
        userLoggedIn: ContactStore.isLoggedIn(),
        //userLoggedIn: LoginStore.isLoggedIn(),
        //user: LoginStore.user,
        //jwt: LoginStore.jwt
        user: ContactStore.user,
        jwt: ContactStore.jwt,
        test: false
      };
    }

    componentDidMount() {
      ContactStore.on("change", this.onChange);
    }

    onChange() {
      this.setState(this.getLoginState());
    }

    componentWillUnmount() {
      //LoginStore.removeChangeListener(this.changeListener);
      ContactStore.removeListener("change", this.onChange);
    }

    render() {
      if (!ContactStore.isLoggedIn()) {
        this.props.history.pushState(null, "/login");
        return null;
      } else {
        return (
          <ComposedComponent
            {...this.props}
            user={this.state.user}
            jwt={this.state.jwt}
            userLoggedIn={this.state.userLoggedIn}
            test={this.state.test} />
          );
        }
      }

  }
};