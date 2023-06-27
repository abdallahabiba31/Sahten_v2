import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState(''); // itemName is defined here
  const [updatedName, setUpdatedName] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await axios.get('http://localhost:5000/items') // Ändern Sie die URL entsprechend Ihren Backend-Endpunkten
        .then(response => setItems(response.data))
        .catch(error => console.error(`Error: ${error}`));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Second Client</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <h2>List of ingredients from the server</h2>

      {items.map(item => (
            <div key={item.id}>
            {/* <h3>{item.name}</h3> */}
            <ul>
           <li>{item.name}</li>
           </ul>
          </div>
          
      ))}
    </div>
  );
}

export default App;
