'use strict';

import color from 'componentsShareStyle/color';

export default {
  root: {
    width: 'calc(100% / 7 - 2px)',
    minHeight: 'initial',
    border: `0.5px solid ${color.grey}`,
    color: color.darkGrey,
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none'
  },

  notThisMonth: {
    color: color.grey
  },

  icon: {
    margin: '25% 0px',
    width: '50%',
    height: '50%',
    color: color.cyan
  },

  text: {
    padding: '5px 5px 0px 0px',
    textAlign: 'right'
  }
};
