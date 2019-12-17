import React from 'react';
import data from '../components/AboutStaticData';
import { useMediaQuery } from 'react-responsive'
import './About.css';

const About = () => {
return (
<div className="about">
  <h1>BIO</h1>
    {data.BIO.map((paragraph, index) => {
      return <p className="para" key={index}>{paragraph}</p>
    })}
    <p>---</p>
    {data.STATEMENT.map((paragraph, index) => {
      return <p className="para" key={index}>{paragraph}</p>
    })}

  <h1>CV</h1>
    <h2>EXHIBITION HISTORY</h2>
      {parse(data.EXHIBITIONS)}
    <h2>PUBLIC ART ENGAGEMENT</h2>
      {parse(data.ENGAGEMENT)}
    <h2>PUBLICATIONS</h2>
      <h3><i>Photography</i></h3>
        {parse(data.PHOTOGRAPHY)}
      <h3><i>Poetry</i></h3>
        {parse(data.POETRY)}
    <h2>AWARDS</h2>
      {parse(data.AWARDS)}
    <h2>EDUCATION</h2>
      {parse(data.EDUCATION)}
</div>
  )
}

function parse(collection) {
  return collection.map((val, index) => {
    return <Entry year={val.year} entry={val.entry} italics ={val.italics} key={index} />
  })
}

const Entry = ({year, entry, italics}) => {
  let yearClass = "year";
  const isMobile = useMediaQuery({ query: '(max-width: 750px)' })
  if(isMobile) yearClass="yearMobile"
  return (
    <div className="cv">
      <span className={yearClass}>
        {year}
      </span>
      <span className="entry" >
        {entry} <i>{italics}</i>
      </span>
    </div>
  )
}

export default About;