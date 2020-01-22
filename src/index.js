import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import { render } from 'react-dom';
import { useQuery } from '@apollo/react-hooks';

//HAHHAHA KAKKAPYLLY LOL XD
const client = new ApolloClient({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
});

const HSL_KYSELY = gql`
  {
  stops(name: "gransinmäk") {
    name
    stoptimesWithoutPatterns {
        realtimeArrival
        headsign
        serviceDay
  }
}
}
`;
const HSL_JUNAT = gql`
  {
  stations(name: "leppävaar") {
    gtfsId
    name
    lat
    lon
    stops {
      gtfsId
      name
      code
      platformCode
    }
  }
}
`;

function muunnos(a, b) {
    var d = new Date();
    var aika = d.getTime();
    var myDate = new Date((a + b) * 1000);
    var saapuu = myDate - aika;
    return millisToMinutes(saapuu);
}

function millisToMinutes(millis) {
    var minutes = Math.floor(millis / 60000);
    return ' arrives in ' + minutes + ' min';
}

function HSL() {
    const { loading, error, data } = useQuery(HSL_KYSELY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.stops.map(({ name, stoptimesWithoutPatterns, realtimeArrival, realtimeState, serviceDay, realtime, headsign }) => (
        <div key={name, stoptimesWithoutPatterns, realtimeArrival, realtime, realtimeState, headsign, serviceDay, realtime}>
            <p>
                <b>Buss stop : {name}</b> {stoptimesWithoutPatterns.map(stoptimesWithoutPatterns => <div><b>Buss to : </b><b>{stoptimesWithoutPatterns.headsign}</b>
                    <b>{muunnos(stoptimesWithoutPatterns.serviceDay, stoptimesWithoutPatterns.realtimeArrival)}</b>
                </div>)}
            </p>
        </div>
    ));
}

function HSL_1() {
    const { loading, error, data } = useQuery(HSL_JUNAT);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROROORORORORORORORORO</p>;

    return data.stations.map(({ name, gtfsID, stops, platformCode }) => (
        <div key={name, gtfsID, stops, platformCode}>
            <p>
                <div>
                {name} {stops.map(stops => <div> {stops.platformCode}</div>)}
                </div>
            </p>
        </div>
    ));
}

const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h2>HSL TOIMII SITTENKIN</h2>
            <HSL />
        </div>
        <div>
            <HSL_1 />
        </div>
    </ApolloProvider>

);


render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
