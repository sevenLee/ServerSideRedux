import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium, { StyleRoot } from 'radium';


@Radium
class AnotherView extends Component {

  renderList (data, index) {
    return (
      <li key={index}>
        {data}
      </li>
    );
  }

  render() {
    const { text, url } = this.props.infos;
    console.log('this.props:', this.props);
    console.log('theme view:', text);
    console.log('url view:', url);
    stylesSet.custom = {
      fontSize: text
    };

    return (
      <div>
        <div style={[stylesSet.base, stylesSet.custom]}>Another View</div>
        <div>
          {text}
        </div>
        <div>{url}</div>
      </div>
    );
  }

}

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
}

export default connect(
  (state) => {
    console.log('another view trigger state:', state);
    return {
      infos: state.infos
    }
  }
)(AnotherView);
