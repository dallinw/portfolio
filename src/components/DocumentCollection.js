import React, { useState, useEffect } from 'react';
import Document from './PDFPreview';
import './DocumentCollection.css'
// pdfjs CDN
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const fileNames = {
  'coloring': [{file: 'gf_color_print', name: 'My Girlfriend Coloring Page'}, 
               {file: 'pronoun_color_print', name: 'Pronouns Coloring Page'}, 
               {file: 'callme_color_print', name: 'Call Me Any Time Coloring Page'}, 
               {file: 'cow_color_print', name: 'The Cow Said Coloring Page'}, 
               {file: 'miley_color_print', name: 'Miley Cyrus Pet Pig Coloring Page'}, 
               {file: 'chicken_color_print', name: 'The Chicken Coloring Page'}, 
               {file: 'lawn_color_print', name: 'Lawn Coloring Page'}],
  'mazes': [{file: 'mitski_maze_print', name: 'Best American Girl Maze'}, 
            {file:  'selfie_maze_print', name: 'Selfie Maze'}],
  'searches': [{file: 'toy_search_print', name: 'Toy Search'}, 
               {file: 'fight_search_print', name: 'Fight Search'}, 
               {file: 'fancy_search_print', name: 'Fancy Search'}, 
               {file: 'falling_search_print', name: 'Falling Girls Search'},
               {file: 'destroyer_search_print', name: 'Destroyer Search'},
               {file: 'room_search_print', name: 'Room Search'},
               {file: 'ladiesnite_search_print', name: 'Ladies Nite Search'},
               {file: 'workers_search_print', name: 'Workers Create All Wealth Search'},
               {file: 'chores_search_print', name: 'Chore Day Search'}]
}
const context = require.context('../assets/pdfs', true);


const DocumentCollection = ({collection, show}) => {
  const [showClassName, setShowClassName] = useState("hidden")
  
  useEffect(()=>{
    if(show) setShowClassName("reveal");
    else setShowClassName("hidden");
  },[show])

  if(collection === "default") return null;
  let collectionNames = fileNames[collection];
  let pdfs = getPDFs();

  function getPDFs()
  {
    let paths = [];
    collectionNames.forEach(name => {
      let pdf = context(`./${collection}/${name.file}.pdf`)
      paths.push(pdf)

    })
    return paths;
  }

  if(collection === "default") return null;
  return (
    <div className={showClassName}>
      {pdfs.map((path, index) => {
        return (
            <Document path={path} title={collection === 'searches' ? null : collectionNames[index].name} key={index}/>
        )
      })}
    </div>
  );
}

export default DocumentCollection