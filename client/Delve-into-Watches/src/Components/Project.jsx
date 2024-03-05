import React, { useEffect, useState } from 'react';
import './../App.css';
import './Project.css';
import { Link } from 'react-router-dom';

function DelveIntoWatch() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async() => {
    const res = await fetch("https://delve-into-watches.onrender.com/get")
    const newData = await res.json()
    console.log(newData)
    setData(newData)
  }

  const handleDelete = async (watchID) => {
    try{
      const response = await fetch(`https://delve-into-watches.onrender.com/delete/${watchID}`,{
        method:'Delete'
      });
      if (response.ok){
        const updatedData = data.filter(item => item.WatchID !== watchID);
        setData(updatedData)
      } else {
        console.error("Error")
      }
    } catch (error){
      console.error(error)
    }
  }

  return (
    <>
    <Link to='/insert'><button id='add'>ADD</button></Link>
    <div className='Sample'>
      {data && data.map((watch) => (
        <div className='card' key={watch.WatchID}>
          <strong>WatchID:</strong> {watch.WatchID} <br />  
          <strong>Brand:</strong> {watch.Company} <br />
          <strong>Model:</strong> {watch.ModelName} <br />
          <strong>Produced Year:</strong> {watch.ProducedYear} <br />
          {/* <img src={watch.image}/> */}
          <p>{watch.image}</p>
          <Link to={`/update/${watch.WatchID}`}><button>Update</button></Link>
          <button onClick={(e) => handleDelete(watch.WatchID)}>Delete</button>

        </div>
      ))}
    </div>
    </>
  );
}

export default DelveIntoWatch;
