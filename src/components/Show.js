'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import moment from 'moment';

import style from './style/show';

@radium
export default class Show extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired,
      statistics: PropTypes.string.isRequired,
      users: PropTypes.arrayOf(PropTypes.shape({
        username: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired
      })).isRequired
    })).isRequired
  }

  render() {
    return (
      <div>
        {this.props.data.map(({date, statistics, users}, dIndex) => {
          const [month, newDate] = date.split(/-/);

          return (
            <div key={dIndex}
              style={style.root}
            >
              <div style={style.title}>
                <h2 style={style.text}>{moment({month: month - 1, date: newDate}).format('MM / DD')}</h2>
                <p style={[style.text, style.statistics]}>{statistics}</p>
              </div>

              {users.map(({email, username, img}, userIndex) => (
                <div key={userIndex}
                  style={style.img(img)}
                >
                  {username.split(/ /)[0]}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}
