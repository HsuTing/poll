'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import moment from 'moment';
import Input from 'cat-components/lib/Input';
import Button from 'cat-components/lib/Button';

import style from './style/chatroom';

@radium
export default class Chatroom extends React.Component {
  static propTypes = {
    user: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {
        value: '',
        error: [],
        isError: false
      },
      messages: []
    };

    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  async componentDidMount() {
    const snapshot = await firebase.database().ref('/chatroom').once('value');
    this.setState({messages: [...(snapshot.val() || [])].reverse()});
  }

  render() {
    const {data, messages} = this.state;
    const {value} = data;

    return (
      <div style={style.root}>
        <h3>我有話要說</h3>

        <Input type={'textarea'}
          value={value}
          onChange={this.onChange}
          rules={[{
            validator: 'isEmpty',
            message: ''
          }]}
        />

        <Button style={style.button}
          onClick={this.submit}
        >送出</Button>

        {messages.map(({username, img, message, time}, messageIndex) => (
          <div key={messageIndex}
            style={style.message.root}
          >
            <div style={style.message.img(img)} />

            <div style={style.message.block}>
              <h4 style={style.message.username}>{username}</h4>

              <p style={style.message.message}>{message}</p>

              <div style={style.message.time}>{time}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  onChange(data) {
    this.setState({data});
  }

  submit() {
    const {user} = this.props;
    const {data, messages} = this.state;
    const {value, isError} = data;
    const {displayName, photoURL} = user;

    if(isError || !user)
      return;

    const output = {
      username: displayName,
      img: photoURL,
      message: value,
      time: moment().format('MMMM Do YYYY, hh:mm:ss')
    };

    firebase.database().ref(`/chatroom/${messages.length}`).set(output);

    this.setState({
      data: {
        value: '',
        isError: false,
        error: []
      },
      messages: [output].concat(messages)
    });
  }
}
