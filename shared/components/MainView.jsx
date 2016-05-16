import React, { PropTypes, Component } from 'react';


class MainView extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <div id="main-view" className="container">
        <h1 className="page-header">MainView</h1>
        {this.props.children}
      </div>
    );
  }
}

export default MainView;
