import React from 'react';
import './App.css';
import { useQuery} from '@apollo/react-hooks';
import gql from "graphql-tag";

const HSL = gql`
{
  stations(name:"leppävaaran") { 
    name
    stoptimesWithoutPatterns (numberOfDepartures: 10) {
      realtimeArrival
      serviceDay
       trip {
        tripHeadsign
        routeShortName
        directionId
        
      }
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


function App_1() {
const { data , loading, error} = useQuery(HSL);


if (loading) return <p>LOADING</p>;
if (error) return <p>ERROR {error.message}</p>

console.log(data);

  return (
    <React.Fragment>
      {data && data.stations && data.stations.map((stations, iso) => (
      <div key={iso} className="container-fluid dösäri">
        <div class="row">
          <div class="col-12">
            <h2 class="text-center">{stations.name}</h2>
          </div>
        </div>
        <div class="row otsikot">
          <div class="col-4 text-center">
            <h3>Juna nro:</h3>
          </div>
          <div class="col-4 text-center">
            <h3>Määränpää</h3>
          </div>
          <div class="col-4 text-center">
            <h3>Saapuu</h3>
          </div>
        </div>
        <div class="row laatikko">
          <div class="col-4 text-center">
            {stations.stoptimesWithoutPatterns.map((juna, isompi) => {
            return <p key={isompi} className="tiedot">{juna.trip.routeShortName}</p>
            })}
          </div>
          <div class="col-4 text-center">
            {stations.stoptimesWithoutPatterns.map((junat, isoin) => {
            return <p key={isoin} className="tiedot">{junat.trip.tripHeadsign}</p>
            })}
          </div>
          <div class="col-4 text-center">
            {stations.stoptimesWithoutPatterns.map((tiem, isi) => {
            return <p key={isi} className="tiedot">{muunnos(tiem.serviceDay, tiem.realtimeArrival)}</p>
            })}
          </div>
        </div>
      </div>
      ))}
    </React.Fragment>
  );
}
export default App_1;
