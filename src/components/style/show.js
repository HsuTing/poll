'use strict';

import color from 'componentsShareStyle/color';

export default {
  root: {
    margin: '20px 0px'
  },

  title: {
    margin: '10px 0px'
  },

  text: {
    display: 'inline-block',
    margin: '10px 0px'
  },

  count: {
    margin: '0px 0px 0px 15px',
    fontSize: '12px'
  },

  img: img => ({
    display: 'inline-block',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
    color: color.white,
    background: `url(${img}) center / cover`,
    borderRadius: '50%',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '1px 0 5px rgba(0, 0, 0, 0.2)'
  })
};
