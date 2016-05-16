import React, { PropTypes, Component } from 'react';
import { StyleRoot } from 'radium';


class App extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <StyleRoot>
        {this.props.children}
      </StyleRoot>
    );
  }
}

export default App;
