import React, {useState, useEffect} from 'react';
import { Document, Page } from 'react-pdf';
import './DocumentCollection.css'
// pdfjs CDN
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const fileNames = {
  'coloring': ['coloring', 'coloring1', 'coloring2'],
  'puzzles': ['puzzle', 'puzzle1', 'puzzle2', 'puzzle3', 'puzzle4', 'puzzle5'],
  'searches': ['search1', 'search2', 'search3']
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

  function getWidth()
  {
    const pageWidth = window.innerWidth;
    return (pageWidth > 400) ? 400 : pageWidth-50;
  }

  if(collection === "default") return null;
  return (
    <div className={showClassName}>
      {pdfs.map((path, index) => {
        return (
          <a className="blankButton" href={path} target="_blank" key={index}>
          <div className="pdfCard" key={index}>
            <Document className="previewDoc" file={path} key={index} loading="">
              <Page className="previewPage" pageNumber={1} loading="" key={index} width={getWidth()}/>
            </Document>
            <p className="pdfLabel">{collectionNames[index]}</p>
          </div>
          </a>
        )
      })}
    </div>
  );
}

export default DocumentCollection