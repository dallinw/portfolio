import React from 'react';
import './PrintoutCard.css';

const PrintoutCard = ({heading, image}) => {
    return (
        <div className="card">
          <h1 className="cardHeading">{heading}</h1>
          <img className="cardImg" src={image} alt=""/>
        </div>
    )
}

export default PrintoutCard;