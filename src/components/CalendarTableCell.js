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
    choice: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      isChosen: false
    };

    this.toggleChoice = this.toggleChoice.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {month, date} = this.props;
    const key = `${month + 1}-${date}`;

    if((nextProps.choice[key] || {}).isChosen !== (this.props.choice[key] || {}).isChosen)
      this.setState({isChosen: nextProps.choice[key].isChosen});
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
        <Square>
          <div>
            {
              isChosen ?
                <CheckCircleIcon style={style.icon} /> :
                <div />
            }
          </div>
        </Square>

        <div style={style.text}
        >{date}</div>
      </div>
    );
  }

  toggleChoice() {
    const {user, month, date} = this.props;
    const {isChosen} = this.state;
    const {uid, displayName, email, photoURL} = user;

    firebase.database().ref(`${uid}/info`).update({
      username: displayName,
      email,
      img: photoURL
    });
    firebase.database().ref(`${uid}/choice/${month + 1}-${date}`).update({
      isChosen: !isChosen
    });

    this.setState({isChosen: !isChosen});
  }
}
