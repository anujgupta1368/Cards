import React, { useEffect, useState } from 'react';
import './Easy.css';
import { Card } from '../components/Card';

export const Medium = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=5&page=${page}&order=Desc`);
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);


  const handlePrevious = () => {
    if(page > 1) {
        setPage(page => page-1);
    } else {
        setPage(1);
    }

    return() => fetchCards();
  }

  const handleNext = () => {
    setPage(page => page+1);
    fetchCards();
  }

  if (loading) {
    return (
      <div className='loader'>
      </div>
    );
  }

  return (
    <div className='main'>
        <div className='card-container'>
        {cards.length === 0 ? <div>No Images Found!</div> : (
        cards.map((item) => (
            <div key={item.id} className='cards'>
            <Card card={item} />
            </div>
        ))
        )}
        </div>
        <div className='page-buttons'>
            <div className={`button-div previous ${page===1? 'disabled' : ''}`}>
                <button onClick={handlePrevious} disabled={page===1}>Previous</button>
            </div>
            <div className='button-div next'>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    </div>
  );
};