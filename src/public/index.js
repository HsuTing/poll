'use strict';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import console from 'cat-utils/lib/console';

import Index from 'components/Index';

(() => {
  const provider = new firebase.auth.FacebookAuthProvider();
  let user = null;

  firebase.auth().onAuthStateChanged(async currentUser => {
    try {
      if(currentUser)
        user = currentUser;
      else {
        await firebase.auth().signInWithRedirect(provider);
        const result = await firebase.auth().getRedirectResult();
        user = result.user;
      }

      const {uid, displayName, photoURL} = user;
      firebase.database().ref(`${uid}/info`).update({
        username: displayName,
        img: photoURL
      });

      ReactDOM.render(
        <Index user={user} />,
        document.getElementById('root')
      );
    } catch(e) {
      console.log(e);
    }
  });
})();
