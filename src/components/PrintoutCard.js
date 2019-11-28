import React from 'react';
import { useMediaQuery } from 'react-responsive'
import './PrintoutCard.css';

const PrintoutCard = ({heading, image}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 550px)' })
  let cardClassName="card";
  if(isMobile) cardClassName="card mobile"
    return (
        <div className={cardClassName}>
          <h1 className="cardHeading">{heading}</h1>
          <img className="cardImg" src={image} alt=""/>
        </div>
    )
}

export default PrintoutCard;