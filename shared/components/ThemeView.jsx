import React, { Component, PropTypes } from 'react';
import Radium, { StyleRoot } from 'radium';
import { connect } from 'react-redux';



//@Radium
class ThemeView extends Component {

  // static propTypes = {
  //   todoTexts: PropTypes.array.isRequired
  // }

  renderList (data, index) {
    return (
      <li key={index}>
        {data}
      </li>
    );
  }

  render() {


    // var { styles } = this.props;
    // console.log('styles:', styles);
    // let fontSize = styles.get('fontSize');
    // const marginTop = styles.get('marginTop');
    //
    // const stylesSetMap = Map(fromJS (stylesSet));
    // stylesSetMap.setIn(['custom',fontSize], fontSize);
    // stylesSetMap.setIn(['custom',marginTop], marginTop);
    //
    // console.log('fontSize:', fontSize);
    // console.log('marginTop:', marginTop);

    //const stylesSetMapJS = toJS(stylesSetMap);

    // console.log('base:', stylesSetMap.get('base'));
    // console.log('custom:', stylesSetMap.get('custom'));

    const { todoTexts } = this.props;
    console.log('todoTexts:', todoTexts);
    return (
      <ul>
        {todoTexts.map(this.renderList)}
      </ul>
    );

  }
}

//this.props.color === 'red' && styles.red,
var stylesSet = {
  base: {
    fontSize: 16,
    backgroundColor: "#0074d9",
    color: "#fff",
    border: 0,
    borderRadius: "0.3em",
    padding: "0.4em 1em",
    cursor: "pointer",
    outline: "none",

    '@media (min-width: 992px)': {
      padding: "0.6em 1.2em"
    },

    '@media (min-width: 1200px)': {
      padding: "0.8em 1.5em"
    },

    ':hover': {
      backgroundColor: "#0088FF"
    },

    ':focus': {
      backgroundColor: "#0088FF"
    },

    ':active': {
      backgroundColor: "#005299",
      transform: "translateY(2px)",
    }
  }

};


export default connect(
  (state) => {
    console.log('theme view trigger');
    return {
      todoTexts: state.todoTexts
    }
  }
)(ThemeView);
