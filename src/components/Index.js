'use strict';

import 'babel-polyfill';
import React from 'react';
import radium, {StyleRoot} from 'radium';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import Wrapper from 'cat-components/lib/Wrapper';
import CalendarTable from 'cat-components/lib/CalendarTable';
import console from 'cat-utils/lib/console';

import Normalize from 'componentsShare/Normalize';

import CalendarTableCell from './CalendarTableCell';
import Chatroom from './Chatroom';
import Show from './Show';
import style from './style/index';
import calendarTableCellStyle from './style/calendarTableCell';

const pollMonth = 8 - 1;
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
      data: this.getDefaultData(),
      total: 0
    };

    this.getFirebaseDate = this.getFirebaseDate.bind(this);
    this.transformData = this.transformData.bind(this);
    this.update = this.update.bind(this);
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

          const {uid, displayName, photoURL} = user;
          firebase.database().ref(`${uid}/info`).update({
            username: displayName,
            img: photoURL
          });
        }

        const snapshot = await firebase.database().ref(`${user.uid}`).once('value');
        const {choice, info} = snapshot.val() || {choice: {}, info: {}};
        const {data, total} = await this.getFirebaseDate();

        this.setState({
          user,
          choice,
          info,
          data,
          total
        });
      } catch(err) {
        console.log(err);
      }
    });
  }

  render() {
    const data = this.transformData();

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

        <CalendarTable month={pollMonth}>
          <CalendarTableCell {...this.state}
            update={this.update}
          />
        </CalendarTable>

        <br />
        <br />

        <div style={style.grid}>
          <StyleRoot style={style.col}>
            <Show data={data} />
          </StyleRoot>

          <StyleRoot style={style.col}>
            <Chatroom {...this.state} />
          </StyleRoot>
        </div>
      </StyleRoot>
    );
  }

  getDefaultData() {
    const data = {};
    const endDate = moment({month: pollMonth}).endOf('month').format('D') * 1;

    for(let i = 1; i <= endDate; i++)
      data[`${pollMonth + 1}-${i}`] = {
        count: 0,
        users: []
      };

    return data;
  }

  async getFirebaseDate() {
    const {data} = this.state;
    const snapshot = await firebase.database().ref('/').once('value');
    let total = 0;

    snapshot.forEach(childSnapshot => {
      if(childSnapshot.key === 'chatroom')
        return;

      const {choice, info} = childSnapshot.val();
      total = total + 1;

      Object.keys(choice).forEach(key => {
        if(choice[key].isChosen) {
          data[key].count = data[key].count + 1;
          data[key].users.push(info);
        }
      });
    });

    return {data, total};
  }

  transformData() {
    const {data, total} = this.state;

    return Object.keys(data).map(key => ({
      ...data[key],
      date: key,
      statistics: `${data[key].count} 人 / ${total} 人`
    }))
      .sort((a, b) => {
        if(b.count !== a.count)
          return b.count - a.count;
        return a.date.split(/-/)[1] - b.date.split(/-/)[1];
      })
      .reduce((output, d) => {
        if(d.count !== 0 && (output.length < 4 || output[output.length - 1].count === d.count))
          return output.concat(d);
        return output;
      }, []);
  }

  update(key, user, isChosen) {
    const {data} = this.state;

    if(isChosen) {
      data[key].count = data[key].count + 1;
      data[key].users.push(user);
    }
    else {
      data[key].count = data[key].count - 1;
      data[key].users = [...data[key].users].filter(dataUser => dataUser.email !== user.email);
    }

    this.setState({data});
  }
}

/* eslint-disable react/display-name, react/prop-types */
export default ({radiumConfig}) => (
  <Wrapper radiumConfig={radiumConfig}>
    <Index />
  </Wrapper>
);
/* eslint-enable react/display-name, react/prop-types */
