const THEME_URL = 'http://localhost:3000/themePreview';



export default (state = {text:'', url:''}, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, action.attrs);
    default:
      return state;
  }
}


/*
todoText: ["text1", "text2"]




*/
