import React, { useState } from "react";
import './Cards.css';

export const Card = ({ card }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="card">
      {!loaded && <div className="skeleton-card" />} {/* Skeleton shows until image is loaded */}
      <img
        src={card.url}
        alt={`Cat ${card.id}`}
        className={`card-image ${loaded ? 'loaded' : 'loading'}`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
      {loaded && (
        <div className="card-info">
          <p><strong>ID:</strong> {card.id}</p>
          <p><strong>Width:</strong> {card.width}px</p>
          <p><strong>Height:</strong> {card.height}px</p>
        </div>
      )}
    </div>
  );
};