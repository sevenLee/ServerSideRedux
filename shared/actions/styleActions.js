
export const UPDATE_STYLES = 'UPDATE_STYLES';

export function updateStyles (props) {
  return {
    type: UPDATE_STYLES,
    props
  };
}

const uid = () => Math.random().toString(34).slice(2);
const THEME_URL = 'http://localhost:3000/themePreview';

export function addTodo (attrs) {
  return {
    type: 'ADD_TODO',
    attrs
  };
}
