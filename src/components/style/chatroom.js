'use strict';

import color from 'componentsShareStyle/color';

export default {
  root: {
    margin: '20px 0px'
  },

  button: {
    margin: '0px',
    width: '100%'
  },

  message: {
    root: {
      margin: '20px 0px'
    },

    img: img => ({
      display: 'inline-block',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      background: `url(${img}) center / cover`
    }),

    block: {
      display: 'inline-block',
      margin: '0px 0px 0px 20px',
      width: 'calc(100% - 50px - 20px)',
      verticalAlign: 'top'
    },

    username: {
      margin: '0px'
    },

    message: {
      margin: '10px 0px',
      wordBreak: 'break-all'
    },

    time: {
      fontSize: '12px',
      textAlign: 'right',
      color: color.darkGrey
    }
  }
};
