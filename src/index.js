import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import App_1 from './App_1'
import * as serviceWorker from './serviceWorker';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
const cache = new InMemoryCache();

const link = new HttpLink ({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'
})

const client = new ApolloClient({
    link,
    cache
})
   


ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));
ReactDOM.render(<ApolloProvider client={client}><App_1 /></ApolloProvider>, document.getElementById('root_2'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
