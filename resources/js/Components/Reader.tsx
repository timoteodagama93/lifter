import React from 'react';

function Reader({ content_type = 'html', obra }) {
  return (
    <>
      {content_type === 'html' && (
        <>
          <div className="container mx-auto p-4">
            <h1 className="text-xl mb-4"> {obra.title} </h1>
            <div
              className="bg-gray-100 p-4 rounded shadow"
              dangerouslySetInnerHTML={{ __html: obra.resume }}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Reader;
