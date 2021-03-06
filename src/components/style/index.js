'use strict';

export default {
  root: {
    padding: '50px',

    '@media (min-width:480px) and (max-width:839px)': {
      padding: '50px 25px'
    },

    '@media (max-width:479px)': {
      padding: '50px 0px'
    }
  },

  day: {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%'
    },

    item: {
      width: 'calc(100% / 7)',
      padding: '10px 0px',
      fontWeight: 'bold',
      border: '0px'
    }
  },

  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },

  col: {
    width: 'calc(50% - 20px * 2)',
    padding: '0px 20px',

    '@media (max-width:479px)': {
      width: 'calc(100% - 20px * 2)'
    }
  }
};
