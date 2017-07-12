'use strict';

import color from 'componentsShareStyle/color';

export default {
  root: {
    position: 'relative',
    width: 'calc(100% / 7 - 2px)',
    minHeight: 'initial',
    border: `0.5px solid ${color.grey}`,
    color: color.darkGrey,
    textAlign: 'center',
    cursor: 'pointer'
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
    position: 'absolute',
    top: '5px',
    right: '5px'
  }
};
