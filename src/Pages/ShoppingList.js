import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import "../style/ShoppingList.css"


function ShoppingList() {
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
    
      const handleSubmit = async event => {
        event.preventDefault();
        await axios.post('http://localhost:5000/items', { name: itemName })
          .then(response => {
            // The response contains the item as it was saved
            setItems([...items, response.data]);
          })
          .catch(error => console.error(`Error: ${error}`));
      };
    
      const handleDelete = async (id) => {
        console.error(`Error: ${id}`);
        await axios.delete(`http://localhost:5000/items/${id}`)
          .then(response => {
            setItems(items.filter(item => item.id !== id));
          })
          .catch(error => console.error(`Error: ${error}`));
      };
    
      const handleUpdate = async (id) =>  {
         await axios.put(`http://localhost:5000/items/${id}`, { name: updatedName, id:id })
          .then(response => {
            setItems(items.map(item => item.id === id ? response.data : item));
            setUpdatedName(''); // Clear the updated name field
          })
          .catch(error => console.error(`Error: ${error}`));
      };
    
      /* if(!accessToken){
        return window.location.href = '/';
      } */
    return (
        <div className="shopping">
            <Navbar />
            <div className=''>
            <h1>Shopping list</h1>
          <form className='label' onSubmit={handleSubmit}>
            <label className='space'>
              Ingredients name: 
              <input className='' placeholder='Milk' type="text" value={itemName} onChange={e => setItemName(e.target.value)} />
            </label>
            <button type='submit'>
                Add Ingredient
            {/* <input type="submit" value="Add Ingredient" /> */}
            </button>

          </form>
          {items.map(item => (
            <div key={item.id}>
            <h2>{item.name}</h2>
            {/* <h2>{item.id}</h2> */}
            <label className='label2 space'>
              Edit name:  
              <input className='in' type="text" value={updatedName} onChange={e => setUpdatedName(e.target.value)} />
            </label>
            <button className='bu' onClick={() => handleDelete(item.id)}>Delete</button>
            <button className='bu' onClick={() => handleUpdate(item.id)}>Update</button>
          </div>
          ))}
        </div>
</div>
)}

export default ShoppingList
