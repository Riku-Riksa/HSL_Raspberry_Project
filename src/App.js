import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery} from '@apollo/react-hooks';
import gql from "graphql-tag";

const HSL_KYSELY = gql`
  {
  stops(name: "gransinmäk") {
    name
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


function muunnos(a, b) {
  var d = new Date();
  var aika = d.getTime();
  var myDate = new Date((a + b) * 1000);
  var saapuu = myDate - aika;
  return millisToMinutes(saapuu);
}

function millisToMinutes(millis) {
  var minutes = Math.floor(millis / 60000);
  return ' arrives in : ' + minutes + ' min';
}


function App() {
const {data , loading, error} = useQuery(HSL_KYSELY);

if (loading) return <p>LOADING</p>;
if (error) return <p>ERROR {error.message}</p>

console.log(data);

  return (
    <React.Fragment>
      <div className="container">
        {data && data.stops && data.stops.map((stops, index) => (
          <div key = {index} className="taulu">
            <h1>{stops.name}</h1>
        {stops.stoptimesWithoutPatterns.map((stoptimesWithoutPatterns, indx) => {
          return <p key={indx} className="asema">{stoptimesWithoutPatterns.headsign}{muunnos(stoptimesWithoutPatterns.serviceDay, stoptimesWithoutPatterns.realtimeArrival)}</p>
        })}
          </div>
        ))}
        
      </div>
    </React.Fragment>
  );
}

export default App;