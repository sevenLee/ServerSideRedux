import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { updateStyles } from '../actions/styleActions';
import { addTodo } from '../actions/styleActions'



class Control extends Component {
  // componentWillMount() {
  //   this.props.dispatch(initialize('ControlForm', {
  //     fontSize: '100'
  //   }, ['fontSize', 'marginTop']));
  // }

  onSubmit(props) {
    this.props.updateStyles(props);
  }

  render() {
    //redux form pass field and handleSubmit helper to this.props
    const { fields: { fontSize, marginTop }, handleSubmit } = this.props;
    // const fontSize = this.props.field.fontSize;
    var uid = () => Math.random().toString(34).slice(2);
    const THEME_URL = 'http://localhost:3000/themePreview';


    //handleSubmit(here pass an action creator)
    return (
      <div className="col-md-4 panel panel-default">
        <div className="panel-body">
            <div>Control</div>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div className="form-group">
                <label>Font Size</label>
                <input type="text" ref="fontSize" className="form-control" {...fontSize} onChange={event => {
                  this.props.fields.fontSize.onChange(event);
                  console.log(event.target.value);
                  //dispatch(addTodo(event.target.value));
                  this.props.addTodo({text:event.target.value, url:uid()});
                  // setTimeout(() =>
                  //   this.props.handleSubmit(submitForm));
                }}/>
              </div>

              <div className="form-group">
                <label>Margin Top</label>
                <input type="text" className="form-control" {...marginTop} />
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>

            </form>
        </div>
      </div>
    );
  }
}

//connect: first argument os mapStateToProps, 2nd is mapDispatchToProps
//reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
  form: 'ControlForm',
  fields: ['fontSize', 'marginTop']
}, null, { updateStyles, addTodo})(Control);
//now, this.prop has updateStyles method

/*

redux form is injecting some helper for us on to this.props inside this component


we need to map different input our form, different field we defined at the bottom

redux form helper provide field

*/
