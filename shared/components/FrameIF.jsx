import React, { Component } from 'react';
import AnotherView from './AnotherView';

import { connect } from 'react-redux';


class Frame extends Component {
  renderList (data, index) {
    return (
      <li key={index}>
        {data}
      </li>
    );
  }

  render() {    
    const { text, url } = this.props.infos;
    const themeUrl = `http://localhost:3000/themePreview?id=${url}`;
    console.log('Frame theme view:', text);
    console.log('Frame url view:', url);
    return (
      <div className="video-detail col-md-8 panel panel-default">
        <div className="embed-responsive embed-responsive-16by9 panel-body">
          <iframe src={themeUrl}></iframe>
        </div>
        <div className="details" >
          {text}
        </div>
        <div>{url}</div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    console.log('FRAME IF trigger state:', state);

    return {
      infos: state.infos
    }
  }
)(Frame);
