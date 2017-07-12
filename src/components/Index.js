'use strict';

import 'babel-polyfill';
import React from 'react';
import radium, {StyleRoot} from 'radium';
import ReactMarkdown from 'react-markdown';
import Wrapper from 'cat-components/lib/Wrapper';
import CalendarTable from 'cat-components/lib/CalendarTable';
import console from 'cat-utils/lib/console';

import Normalize from 'componentsShare/Normalize';

import CalendarTableCell from './CalendarTableCell';
import Show from './Show';
import style from './style/index';
import calendarTableCellStyle from './style/calendarTableCell';

const intro = `
## 同學會時間調查
- ##### 時間： 八月份
- ##### 有任何意見歡迎提出～～
`;

@radium
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      choice: {},
      info: {},
      data: []
    };
  }

  componentDidMount() {
    const provider = new firebase.auth.FacebookAuthProvider();
    let user = null;

    firebase.auth().onAuthStateChanged(async currentUser => {
      try {
        if(currentUser)
          user = currentUser;
        else {
          const result = await firebase.auth().signInWithPopup(provider);
          user = result.user;
        }

        const snapshot = await firebase.database().ref(`${user.uid}`).once('value');
        const {choice, info} = snapshot.val() || {choice: {}, info: {}};
        const data = await this.getData();

        this.setState({
          user,
          choice,
          info,
          data
        });
      } catch(err) {
        console.log(err);
      }
    });
  }

  render() {
    const {data} = this.state;

    return (
      <StyleRoot style={style.root}>
        <Normalize />

        <ReactMarkdown source={intro} />

        <br />
        <br />

        <div style={style.day.root}>
          {[
            '日', '一', '二', '三', '四', '五', '六'
          ].map((day, dayIndex) => (
            <div key={dayIndex}
              style={[calendarTableCellStyle.root, style.day.item]}
            >{day}</div>
          ))}
        </div>

        <CalendarTable month={7}>
          <CalendarTableCell {...this.state} />
        </CalendarTable>

        <br />
        <br />

        <Show data={data} />
      </StyleRoot>
    );
  }

  async getData() {
    const snapshot = await firebase.database().ref('/').once('value');
    const output = {};
    let total = 0;

    snapshot.forEach(childSnapshot => {
      const {choice, info} = childSnapshot.val();
      total = total + 1;

      Object.keys(choice).forEach(key => {
        if(choice[key].isChosen) {
          if(output[key] !== undefined) {
            output[key].count = output[key].count + 1;
            output[key].users.push(info);
          } else {
            output[key] = {
              count: 1,
              users: [info]
            };
          }
        }
      });
    });

    return Object.keys(output).map(key => ({
      ...output[key],
      date: key,
      count: `${output[key].count} 人 / ${total} 人`
    }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);
  }
}

/* eslint-disable react/display-name, react/prop-types */
export default ({radiumConfig}) => (
  <Wrapper radiumConfig={radiumConfig}>
    <Index />
  </Wrapper>
);
/* eslint-enable react/display-name, react/prop-types */
