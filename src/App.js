import React from 'react';
import './App.css';
import { useQuery} from '@apollo/react-hooks';
import gql from "graphql-tag";

const HSL_KYSELY = gql`
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
    return ' ' + minutes + ' minute ';
  }else  {
    return ' ' + minutes + ' min';
  }
}


function App() {
const { data , loading, error} = useQuery(HSL_KYSELY);


if (loading) return <p>LOADING</p>;
if (error) return <p>ERROR {error.message}</p>

console.log(data);

  return (
    <React.Fragment>
      {data && data.stops && data.station && data.stops.map((stops, station, index) => (
      <div key={index} className="container-fluid dösäri">
        <div class="row">
          <div class="col-12">
            <h2 class="text-center">{stops.name}: {stops.desc}</h2>
          </div>
        </div>
        <div class="row otsikot">
          <div class="col-4 text-center">
            <h3>BussiNro</h3>
          </div>
          <div class="col-4 text-center">
            <h3>Määränpää</h3>
          </div>
          <div class="col-4 text-center">
            <h3>Saapuu</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-4 text-center">
            {stops.patterns.map((p, ind) => {
            return <p key={ind} className="tiedot">{p.route.shortName}</p>
            })}
          </div>
          <div class="col-4 text-center">
            {stops.stoptimesWithoutPatterns.map((st, indx) => {
            return <p key={indx} className="tiedot">{st.headsign}</p>
            })}
          </div>
          <div class="col-4 text-center">
            {stops.stoptimesWithoutPatterns.map((aika, indx) => {
            return <p key={indx} className="tiedot">{muunnos(aika.serviceDay, aika.realtimeArrival)}</p>
            })}
          </div>
        </div>
      </div>
      ))}

    </React.Fragment>
  );
}
export default App;
