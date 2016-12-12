import React from 'react';
import {createStore,applyMiddleware,combineReducers} from 'redux';
import {listofAddProduct,fetchmenuReducer,fetchsubitemReducer} from './reducers/reducers';
import thunkMiddleware  from 'redux-thunk';
import createLogger from 'redux-logger';
import App from './components/App';
import ProductList from './components/ProductList';
import NotFound  from './components/Notfound';
import Checkout from './components/Checkout';
import Menus from './components/Menus';import Maincontent from './components/Maincontent';
import ReactDOM from 'react-dom';
import {Provider}  from 'react-redux';
import {Router,Route,IndexRoute,hashHistory} from 'react-router';
import {syncHistoryWithStore,routerReducer} from 'react-router-redux'; 
const loggerMiddleware=createLogger();

const reducer=combineReducers({
	listofAddProduct,fetchmenuReducer,fetchsubitemReducer,routing:routerReducer
});
const store=createStore(reducer,
applyMiddleware(thunkMiddleware,loggerMiddleware)
);

const history = syncHistoryWithStore(hashHistory, store);
ReactDOM.render(<Provider store={store}>
      <Router history={history}>
        <Route  component={App}>
		      <Route path="/" component={Menus}>
			  <Route path="/checkout" component={Checkout}/>
        <Route path="/paytm/:id" component={Maincontent}/>
		<Route path="/paytm/product/:pid" component={ProductList}/>	
    </Route>
         </Route>
		 
      </Router>
  </Provider>,document.getElementById("app"));

