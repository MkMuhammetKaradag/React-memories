import React from 'react'
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import reducers from './reducers'
import App from './App';
import './index.css'
// const store=createStore(reducers,compose(applyMiddleware(thunk)))
const middleware = [thunk];
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 50 });
const store = createStore(
     reducers,
    composeEnhancers(applyMiddleware(...middleware))
    
 );
ReactDom.render(
   <Provider store={store} >
        <App>

        </App>
   </Provider>
    ,document.getElementById('root'));