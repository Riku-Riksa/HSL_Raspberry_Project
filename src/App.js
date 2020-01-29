import React from 'react';
import './App.css';
import { useQuery} from '@apollo/react-hooks';
import gql from "graphql-tag";

const HSL_KYSELY = gql`
  {
  stops(name: "gransinmäk") {
    name
    desc
    patterns {
        route {
            shortName
        }
    }
    stoptimesWithoutPatterns {
        realtimeArrival
        headsign
        serviceDay
  }
}
}
`;

const HSL = gql`
  {
    station(id: "HSL:1000202") {
      name
      stoptimesWithoutPatterns(numberOfDepartures: 10) {
        stop {
          platformCode
        }
        serviceDay
        scheduledArrival
        scheduledDeparture
        trip {
          route {
            shortName
          }
        }
        headsign
      }
    }
  }`;

function muunnos(a, b) {
  var d = new Date();
  var aika = d.getTime();
  var myDate = new Date((a + b) * 1000);
  var saapuu = myDate - aika;
  return millisToMinutes(saapuu);
}

function millisToMinutes(millis) {
  var minutes = Math.floor(millis / 60000);
  if (minutes < 1) {
    return ' arrives in less than : ' + minutes + ' minute';
  }else  {
    return ' arrives in : ' + minutes + ' min';
  }
}


function App() {
const { data , loading, error} = useQuery(HSL_KYSELY);
const { data: Data, loading: Loading, error: Errorr} = useQuery(HSL)

if(Loading) return <p></p>;
if(Errorr) return <p>{error.message}</p>

if (loading) return <p>LOADING</p>;
if (error) return <p>ERROR {error.message}</p>
console.log(data);
console.log(Data);

  return (
    <React.Fragment>
      <div className="container">
        {data && data.stops && data.stops.map((stops, index) => (
          <div key = {index} className="taulu">
            <h1>{stops.name}: {stops.desc}</h1>
        {stops.stoptimesWithoutPatterns.map((stoptimesWithoutPatterns, indx) => {
          return <l key={indx} className="asema">{stoptimesWithoutPatterns.headsign}{muunnos(stoptimesWithoutPatterns.serviceDay, stoptimesWithoutPatterns.realtimeArrival)}</l>
        })}
        {stops.patterns.map((patterns, ind) => {
          return <l key={ind} className="lyhyt">{patterns.route.shortName}</l>
        })}
          </div>
        ))}
        
      </div>
    </React.Fragment>
  );
}
export default App;