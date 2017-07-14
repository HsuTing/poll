'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import CheckCircleIcon from 'react-icons/lib/md/check-circle';
import Square from 'cat-components/lib/Square';

import style from './style/calendarTableCell'

@radium
export default class CalendarTableCell extends React.Component {
  static propTypes = {
    month: PropTypes.number,
    date: PropTypes.number,
    sameMonth: PropTypes.bool,
    user: PropTypes.object,
    choice: PropTypes.object,
    update: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    const {month, date, choice} = props;
    const key = `${month + 1}-${date}`;

    this.state = {
      isChosen: (choice[key] || {}).isChosen || false
    };

    this.toggleChoice = this.toggleChoice.bind(this);
  }

  render() {
    const {date, sameMonth, ...props} = this.props;
    const {isChosen} = this.state;
    const newStyle = [
      props.style,
      style.root
    ];

    if(!sameMonth)
      newStyle.push(style.notThisMonth);

    return (
      <div style={newStyle}
        onClick={this.toggleChoice}
      >
        <div style={style.text}
        >{date}</div>

        <Square>
          <div>
            {
              isChosen ?
                <CheckCircleIcon style={style.icon} /> :
                <div />
            }
          </div>
        </Square>
      </div>
    );
  }

  toggleChoice() {
    const {user, month, date, sameMonth, update} = this.props;
    const {isChosen} = this.state;

    if(!user || !sameMonth)
      return;

    const {uid, displayName, photoURL} = user;

    firebase.database().ref(`${uid}/choice/${month + 1}-${date}`).update({
      isChosen: !isChosen
    });

    update(`${month + 1}-${date}`, {
      username: displayName,
      img: photoURL
    }, !isChosen);
    this.setState({isChosen: !isChosen});
  }
}
