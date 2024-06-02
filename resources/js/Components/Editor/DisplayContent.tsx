import React from 'react';

const DisplayContent = ({article}) => {
    const savedContent = localStorage.getItem('savedContent');

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl mb-4"> {article.title}  </h1>
            <div
                className="bg-gray-100 p-4 rounded shadow"
                dangerouslySetInnerHTML={{ __html: article.html }}
            />
        </div>
    );
};

export default DisplayContent;
