import React, { useEffect, useState } from 'react';
import './../App.css';
import './Project.css';

function DelveIntoWatch() {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async() => {
    const res = await fetch("https://delve-into-watches.onrender.com/get")
    const newData = await res.json()
    console.log(newData)
    setData(newData)
  }
  return (
    
    <div className='Sample'>
      {data && data.map((watch) => (
        <div className='card' key={watch.WatchID}>
          <strong>WatchID:</strong> {watch.WatchID} <br />  
          <strong>Brand:</strong> {watch.Company} <br />
          <strong>Model:</strong> {watch.ModelName} <br />
          <strong>Produced Year:</strong> {watch.ProducedYear} <br />
          {/* <img src={watch.image}/> */}
          <p>{watch.image}</p>
        </div>
      ))}
    </div>
  );
}

export default DelveIntoWatch;
