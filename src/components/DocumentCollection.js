import React, { useState, useEffect } from 'react';
import Document from './PDFPreview';
import './DocumentCollection.css'
// pdfjs CDN
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const fileNames = {
  'coloring': ['my girlfriend coloring page', 'the cow said coloring page', 'miley cyrus pet pig coloring page'],
  'puzzles': [],
  'searches': ['toy search', 'fight search', 'fancy search', 'falling girls search', 'destroyer search']
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
      let pdf = context(`./${collection}/${name}.pdf`)
      paths.push(pdf)

    })
    return paths;
  }

  if(collection === "default") return null;
  return (
    <div className={showClassName}>
      {pdfs.map((path, index) => {
        return (
            <Document path={path} title={collectionNames[index]} key={index}/>
        )
      })}
    </div>
  );
}

export default DocumentCollection