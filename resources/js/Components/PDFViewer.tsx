import React from 'react';

const PDFViewer = ({ url }) => {
  return (
    <div className="w-full h-[100%] flex justify-center items-center rigth-0">
      <iframe src={url} className="w-full h-[100vh] " />
    </div>
  );
};
export default PDFViewer;
