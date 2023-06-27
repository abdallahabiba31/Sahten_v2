import { useEffect, useState } from "react";
import './Slider.css'
import axios from "axios";

const Slider = () => {
  const [joke, setJoke] = useState('');
  const [punchline, setPunchline] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await axios.get(`https://official-joke-api.appspot.com/random_joke`).then(response => {
        console.log(response.data.setup);
        console.log(response.data.punchline);
        setJoke(response.data.setup);
        setPunchline(response.data.punchline);
      })} catch (error) {
      console.error(error);
    }
  };

  
  return (
    <div className='container slider-box'>
        <h1 className="jokeText">{joke}</h1>
        <h3 className="punchText">{punchline}</h3>
    </div>
  )
}

export default Slider