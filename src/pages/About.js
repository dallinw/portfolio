import React from 'react';
import { useMediaQuery } from 'react-responsive';
import './About.css';

const About = ({ content }) => {
  let categories = content && content.cv && Object.keys(content.cv[0]);
  return (
    <div className='about'>
      <h1>BIO</h1>
      {content &&
        content.bio.map((paragraph, index) => {
          return (
            <p className='para' key={index}>
              {paragraph}
            </p>
          );
        })}
      <h1>CV</h1>
      {categories &&
        categories.map((category, index) => {
          return (
            <span className='noFootprintSpan' key={index}>
              <h2>{category.toUpperCase()}</h2>
              {parse(
                content && content.cv && content.cv[0][category],
                category === 'publications'
              )}
            </span>
          );
        })}
    </div>
  );
};

function parse(collection, isPublications) {
  if (isPublications) {
    let categoryNames = new Set();
    collection.forEach((el) => categoryNames.add(el.category));
    return [...categoryNames].map((name, index) => {
      return (
        <span className='noFootprintSpan' key={index}>
          <h3>
            <i>{name}</i>
          </h3>
          {parse(collection.filter((el) => el.category === name))}
        </span>
      );
    });
  } else {
    return (
      collection &&
      collection.map((val, index) => {
        return (
          <Entry
            year={val.year}
            entry={val.text}
            italics={val.publication}
            key={index}
          />
        );
      })
    );
  }
}

const Entry = ({ year, entry, italics }) => {
  let yearClass = 'yearEntry';
  const isMobile = useMediaQuery({ query: '(max-width: 750px)' });
  if (isMobile) yearClass = 'yearEntryMobile';
  return (
    <div className='cv'>
      <span className={yearClass}>{year}</span>
      <span className='entry'>
        {entry} <i>{italics}</i>
      </span>
    </div>
  );
};

export default About;
