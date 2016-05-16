var salaryUpdater = function (salary) {
  var currentSalary = salary; //we can get access to currentSalary by closure, even though it exists ina parent function
  var generator = function () {
    currentSalary *= 2;
    return currentSalary;
  }

  return generator;
}

var updateFn = salaryUpdater(50000); //currentSalary get initialized to 50000 and then in console.log call we are going to call updateFn

console.log(updateFn()); //closure function will execute

updateFn is closure, it points back to this generator function,
and one of the big benefits of the closure now is that we can access the context of the function

we can get access to currentSalary

//====================================================================


var salaryUpdater = function (salary) {
  var currentSalary = salary; //we can get access to currentSalary by closure, even though it exists ina parent function
  var generator = function () {
    currentSalary += 10000;
    return currentSalary;
  }
  return generator;
}

var updateFn = salaryUpdater(50000);
updateFn();
console.log(updateFn();) // 70000


I have a specific scenario in my react/redux/express universal project (server-side rendering).

(1)First I defined my routes like so: [ routes.jsx ]

    export default (
      <Route component={App} path="/">
        <Route component={MainView} path="main">
          <IndexRoute component={ThemeIndex}></IndexRoute>
        </Route>
        <Route component={AnotherView} path="preview" />
      </Route>
    );

As you see, when url route is: **localhost:3000/preview**, react-router will use **AnotherView** component.

(2)Now focus on ThemeIndex component: [ ThemeIndex.jsx ]

iframe get state issue - ThemeIndex.jsx

    export default class ThemeIndex extends Component {
      render() {
        return (
          <div>
            <h2>Index</h2>
            <Frame />
            <Control />
          </div>
        );
      }
    }


(3)Frame component like so: [ Frame.jsx ]

    class Frame extends Component {
      render() {
        const { text, uid } = this.props.infos;
        const themeUrl = `http://localhost:3000/preview?id=${uid}`;
        //console.log('Frame theme:', text);
        //console.log('Frame uid:', uid);
        return (
          <div className="col-md-8 panel panel-default">
            <div className="embed-responsive embed-responsive-16by9 panel-body">
              <iframe src={themeUrl}/></iframe>
            </div>
            <div className="details" >
              {text}
            </div>
          </div>
        );
      }
    }

    export default connect(
      (state) => {
        return {
          infos: state.infos
        }
      }
    )(Frame);

Here I use iframe tag, its src is **http://localhost:3000/preview?id=xxxx**, so it means it will link **AnotherView** component to be iframe's page.

(4)AnotherView Component like so:

    class AnotherView extends Component {
      render() {
        const { text, uid } = this.props.infos;
        //console.log('AnotherView theme:', text);
        //console.log('AnotherView uid:', uid);
        return (
          <div>
            <div >Another View</div>
            <div>
              {text}
            </div>
            <div>{uid}</div>
          </div>
        );
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

(4)And I have Control component for making dynamic value: [ Component.jsx ]

    class Control extends Component {
      render(){
        var uid = () => Math.random().toString(34).slice(2);

        return (
            <input
              onChange={(event) => this.props.addTodo({text:event.target.value, uid:uid()})
              />
        )
      }
    }

    export default connect(
      (state) => {
        return {
          infos: state.infos
        }
      }
    )(Control);

(5)List extra files, Action and Reducer:
[ action.js ]

    export function addTodo (attrs) {
      return {
        type: 'ADD_TODO',
        attrs
      };
    }

[ reducer.js ]

    export default (state = {text:'', uid:''}, action) => {
      switch(action.type) {
        case 'ADD_TODO':
          return Object.assign({}, state, action.attrs);
        default:
          return state;
      }
    }

Here is Store configuration on server.js:

<!-- begin snippet: js hide: false -->

<!-- language: lang-js -->

    app.use( (req, res) => {
      console.log('server - reducers:', reducers);

      const location = createLocation(req.url);
      const reducer  = combineReducers({infos: infosReducer});
      const store    = applyMiddleware(promiseMiddleware)(createStore)(reducer);

      match({ routes, location }, (err, redirectLocation, renderProps) => {

        .......

        function renderView() {
          const createElement = (Component, props) => (
            <Component
              {...props}
              radiumConfig={{ userAgent: req.headers['user-agent'] }}
            />
          );

          const InitialView = (
              <Provider store={store}>
                <RoutingContext
                  {...renderProps}
                  createElement={createElement} />
              </Provider>
          );

          const componentHTML = renderToString(InitialView);

          const initialState = store.getState();

          ......

<!-- end snippet -->

my application state is like :

    {
      infos:{
        text: '',
        uid: ''
      }
    }

(6)Now I key some words on input in Control component. When the input onChange will trigger **addTodo** action function to dispatch action in reducer, finally change the state. In common, the state changing will effect Frame component and AnotherView component, because I used **react-redux** `connect`, bind the state property to `this.props` on the component.

But in fact, there is a problem in **AnotherView** component. in **Frame** component, `console.log` value display the text you key in input correctly. In AnotherView component, even the connect callback will be trigger (`console.log` will print '`another view trigger state: ...`') , the `console.log` in render is `undefined`, like:

    console.log('AnotherView theme:', text); //return AnotherView theme: undefined
    console.log('AnotherView uid:', uid); //return AnotherView uid: undefined

I found the main reason: **AnotherView** component is in `iframe`. Because if I remove `iframe`, put AnotherView component directly here, like so:

    return (
              <div className="col-md-8 panel panel-default">
                <div className="embed-responsive embed-responsive-16by9 panel-body">
                  <AnotherView/>
                </div>
                <div className="details" >
                  {text}
                </div>
              </div>
    );

then I can bind `state` properties on `this.props` in **AnotherView** component successfully, then insert `{text}` on JSX html, you can see the value changing real time when you key input value on **Control** component. if I use iframe to link **AnotherView** component be its page, you can't see any changing `{text}` value, because my text default value is empty string value.

How do I bind `state` properties to `this.props` in the component which is in `iframe` when state changing?


**Update**
I can't get the latest `state` in iframe (source is React component), when I changing `state` in another component, and actually the `mapStateToProps` was triggered!(means iframe source component) but its state is not the latest in `mapStateToProps` function. it does not really concerns with the `react-redux` library?

This is the latest state should be in component:
[![enter image description here][1]][1]


Below is iframe source component, it can't get the latest state:
[![enter image description here][2]][2]


  [1]: http://i.stack.imgur.com/CJtir.png
  [2]: http://i.stack.imgur.com/Mmie8.png
