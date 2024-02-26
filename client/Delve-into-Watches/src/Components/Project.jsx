import React from 'react';
import data from '../data.json';
import './../App.css';
import './Project.css';

function DelveIntoWatch() {
  return (
    <div className='Sample'>
      <h2>COLLECTION</h2>
      {data.map((watch) => (
        
        <div key={watch.WatchID}>
            <div id='spec'>
          <strong>WatchID:</strong> {watch.WatchID} <br />  
          <strong>Brand:</strong> {watch.Company} <br />
          <strong>Model:</strong> {watch.ModelName} <br />
          <strong>Produced Year:</strong> {watch.ProducedYear} <br />
          </div>
        </div>
      ))}
    </div>
  );
}

export default DelveIntoWatch;
