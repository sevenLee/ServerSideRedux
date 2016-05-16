import { UPDATE_STYLES } from '../actions/styleActions';
import { Map, fromJS } from 'immutable';

function modifyStyles (state, props) {
  return state.set('fontSize', props.fontSize*1).set('marginTop', props.marginTop*1);
}

const initialState = Map(fromJS ({
    fontSize: 15,
    marginTop: 15
  })
);

export default function styleReducer (state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_STYLES:
      return modifyStyles(state, action.props);
    default:
      return state;
  }
};
