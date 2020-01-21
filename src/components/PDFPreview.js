import React from 'react';
import { Document, Page } from 'react-pdf';
import './DocumentCollection.css'

// Create Document Component
const PDFPreview = ({ title, path }) => {

  function getWidth()
  {
    const pageWidth = window.innerWidth;
    return (pageWidth > 400) ? 400 : pageWidth-50;
  }

  return (
    <a className="blankButton" href={path} target="_blank" rel="noopener noreferrer">
    <div className="pdfCard">
      <Document className="previewDoc" file={path} loading="">
        <Page className="previewPage" pageNumber={1} renderAnnotationLayer={false} loading="Loading..." width={getWidth()}/>
      </Document>
      <p className="pdfLabel">{title}</p>
    </div>
    </a>
  )
};

export default PDFPreview;
