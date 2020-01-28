import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
const cache = new InMemoryCache();

const link = new HttpLink ({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'
})
//HAHHAHA KAKKAPYLLY LOL XDs
const client = new ApolloClient({
    link,
    cache
})
   
/*
function HSL() {
    const { loading, error, data } = useQuery(HSL_KYSELY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.stops.map(({ name, stoptimesWithoutPatterns, realtimeArrival, realtimeState, serviceDay, realtime, headsign}) => (
        <div key={name, stoptimesWithoutPatterns, realtimeArrival, realtime, realtimeState, headsign, serviceDay, realtime}>
            <p>
                <b>Buss stop: {name}</b>{stoptimesWithoutPatterns.map(stoptimesWithoutPatterns => <div><b>Buss to : </b><b>{stoptimesWithoutPatterns.headsign}</b>
                    <b>{muunnos(stoptimesWithoutPatterns.serviceDay, stoptimesWithoutPatterns.realtimeArrival)}</b>                  
                </div>)}
            </p>
        </div>
    ));
}
*/



ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
