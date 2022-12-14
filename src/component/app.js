import React from "react";

import Signin from "./signin";
import Signup from "./signup";
import Newpost from "./newpost";
import Singlearticle from './singlearticle'
import Tag from "./tag";
import Setting from "./setting";

import Profile from "./profile";
import Nav from "./nav";
import Editarticle from './editarticle'

import { Switch, Route } from 'react-router-dom'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            isLoggedIn: false,
            user: null,
            isVerifying: true,
        })
    }

    componentDidMount() {
        let storageKey = localStorage['app_user'];
        if (storageKey) {
          fetch('https://mighty-oasis-08080.herokuapp.com/api/user', {
            Method: 'GET',
            headers: {
              authorization: `Token ${storageKey}`,
            },
          })
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              return res.json().then(({ errors }) => {
                return Promise.reject(errors);
              });
            })
            .then(({ user }) => this.updateUser(user))
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.setState({ isVerifying: false });
        }
      }
      updateUser = (user) => {
        this.setState({
          isLoggedIn: true,
          user,
          isVerifying: false,
        });
        localStorage.setItem('app_user', user.token);
      };

    render() {
        return (
            <>
             


<Nav isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        {this.state.isLoggedIn ? (
          <AuthenticatedApp
            user={this.state.user}
            updateUser={this.updateUser}
          />
        ) : (
          <UnauthenticatedApp
            updateUser={this.updateUser}
            user={this.state.user}
          />
        )}

            </>
        )
    }

}







function AuthenticatedApp(props) {
    return (
      <Switch>
        <Route exact path="/">
          <Tag user={props.user} />
        </Route>
        <Route exact path="/new-post">
          <Newpost user={props.user} />
        </Route>
        <Route exact path="/setting">
          <Setting user={props.user} updateUser={props.updateUser} />
        </Route>
        <Route exact path="/profile/:username">
          <Profile user={props.user} />
        </Route>
        <Route path="/article/:slug">
          <Singlearticle user={props.user} />
        </Route>
        <Route path="/editArticle/:slug">
          <Editarticle user={props.user} />
        </Route>

      </Switch>
    );
  }
  
  function UnauthenticatedApp(props) {
    return (
      <Switch>
        <Route exact path="/">
          <Tag />
        </Route>
        <Route path="/signin">
          <Signin updateUser={props.updateUser} />
        </Route>
        <Route path="/signup">
          <Signup updateUser={props.updateUser} />
        </Route>
  
        <Route path="/article/:slug">
          <Singlearticle user={props.user} />
        </Route>

      </Switch>
    );
  }
export default App;