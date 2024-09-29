import React, { useEffect, useState } from "react";
import "./Styles.css";
import { Card } from "../components/Card";

export const Easy = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc"
        );
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="main">
      <div className="card-container">
        {cards.length === 0 ? (
          <div>No Images Found!</div>
        ) : (
          cards.map((item) => (
            <div key={item.id} className="cards">
              <Card card={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
