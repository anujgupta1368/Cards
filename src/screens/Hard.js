import React, { useCallback, useEffect, useState } from "react";
import "./Styles.css";
import { Card } from "../components/Card";

export const Hard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchCards = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=5&page=${page}&order=Desc`
      );
      const data = await response.json();
      setCards((prevCards) => [...prevCards, ...data]);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }
  }, [page, loading]);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/search?limit=5&page=${page}&order=Desc`
        );
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };

    return () => fetchCards();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
        fetchCards();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchCards]);

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
            <div key={item.id} className="cards-hard">
              <Card card={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
