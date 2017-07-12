'use strict';

import React from 'react';
import radium from 'radium';
import Wrapper from 'cat-components/lib/Wrapper';

import Normalize from 'componentsShare/Normalize';

@radium
class Index extends React.Component {
  componentDidMount() {
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => {
        const token = result.credential.accessToken;
        const user = result.user;
        console.log(token, user);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <Normalize />

        This is Index!
      </div>
    );
  }
}

/* eslint-disable react/display-name, react/prop-types */
export default ({radiumConfig}) => (
  <Wrapper radiumConfig={radiumConfig}>
    <Index />
  </Wrapper>
);
/* eslint-enable react/display-name, react/prop-types */
