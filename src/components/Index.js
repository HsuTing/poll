'use strict';

import 'babel-polyfill';
import React from 'react';
import radium, {StyleRoot} from 'radium';
import Wrapper from 'cat-components/lib/Wrapper';
import CalendarTable from 'cat-components/lib/CalendarTable';
//TODO
//import console from 'cat-utils/lib/console';

import Normalize from 'componentsShare/Normalize';

import CalendarTableCell from './CalendarTableCell';
import style from './style/index';

@radium
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      user: null,
      choice: {},
      info: {}
    };
  }

  async componentDidMount() {
    const provider = new firebase.auth.FacebookAuthProvider();

    try {
      const {credential, user} = await firebase.auth().signInWithPopup(provider);
      const snapshot = await firebase.database().ref(`${user.uid}`).once('value');
      const {choice, info} = snapshot.val() || {choice: {}, info: {}};

      this.setState({
        token: credential.accessToken,
        user,
        choice,
        info
      });
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    return (
      <StyleRoot style={style.root}>
        <Normalize />

        <CalendarTable month={7}>
          <CalendarTableCell {...this.state}
          />
        </CalendarTable>
      </StyleRoot>
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
