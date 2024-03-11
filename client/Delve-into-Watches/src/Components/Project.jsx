import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function DelveIntoWatch() {
  const [data, setData] = useState([]);
  const [creators, setCreators] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState('');
  const [isLogin, setisLogin] = useState(false)
  useEffect(() => {
    fetchData();
  }, []);

  const checkLoginStatus = () => {
    const token = getCookie('token');
    setisLogin(!!token);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setisLogin(false);
    window.location.reload();
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
    extractCreators();
  }, [data]);

  const fetchData = async () => {
    try {
      const res = await fetch("https://delve-into-watches.onrender.com/get");
      const newData = await res.json();
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  };

  const extractCreators = () => {
    if (data) {
      const uniqueCreators = [...new Set(data.map(item => item.Createdby))];
      setCreators(uniqueCreators);
    }
  };

  const handleDelete = async (watchID) => {
    try {
      const response = await fetch(`https://delve-into-watches.onrender.com/delete/${watchID}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        const updatedData = data.filter(item => item.WatchID !== watchID);
        setData(updatedData);
      } else {
        console.error("Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreatorChange = (event) => {
    setSelectedCreator(event.target.value);
  };

  const filteredData = selectedCreator ? data.filter(item => item.Createdby === selectedCreator) : data;

  return (
    <div className='Sample'>
      {isLogin && <Link to='/insert'><button id='add'>ADD</button></Link>}
      {isLogin ? (
                    <button className="logout" onClick={handleLogout}>LOGOUT</button>
                ) : (
                    <Link to='/login'><button className="login">LOGIN</button></Link>
                )}

      <div>
        <label htmlFor="creator">Filter by Creator:</label>
        <select id="creator" value={selectedCreator} onChange={handleCreatorChange}>
          <option value="">All</option>
          {creators.map(creator => (
            <option key={creator} value={creator}>{creator}</option>
          ))}
        </select>
      </div>
      {filteredData && filteredData.map((watch) => (
        <div className='card' key={watch.WatchID}>
          <strong>WatchID:</strong> {watch.WatchID} <br />
          <strong>Brand:</strong> {watch.Company} <br />
          <strong>Model:</strong> {watch.ModelName} <br />
          <strong>Produced Year:</strong> {watch.ProducedYear} <br />
          <strong>Creator:</strong> {watch.Createdby} <br />

          {/* <img src={watch.image}/> */}
          <p>{watch.image}</p>
          <p>{watch.createdby}</p>
          {isLogin && <Link to={`/update/${watch.WatchID}`}><button>Update</button></Link>}
          {isLogin && <button onClick={(e) => handleDelete(watch.WatchID)}>Delete</button>}
        </div>
      ))}
    </div>
  );
}

export default DelveIntoWatch;
