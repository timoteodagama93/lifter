import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ImageEditor = ({ imageNode, quill }) => {
  const [width, setWidth] = useState('');
  const [alignment, setAlignment] = useState('');

  const handleWidthChange = (e) => {
    const newWidth = e.target.value;
    setWidth(newWidth);
    imageNode.style.width = newWidth ? `${newWidth}%` : '';
  };

  const handleAlignmentChange = (e) => {
    const newAlignment = e.target.value;
    setAlignment(newAlignment);
    imageNode.style.float = newAlignment;
  };

  const handleDelete = () => {
    imageNode.parentNode.removeChild(imageNode);
    quill.update();
  };

  return (
    <div className="image-editor">
      <label>
        Largura (%):
        <input type="number" value={width} onChange={handleWidthChange} />
      </label>
      <label>
        Alinhamento:
        <select value={alignment} onChange={handleAlignmentChange}>
          <option value="">Nenhum</option>
          <option value="left">Esquerda</option>
          <option value="right">Direita</option>
          <option value="center">Centro</option>
        </select>
      </label>
      <button onClick={handleDelete}>Deletar</button>
    </div>
  );
};

ImageEditor.propTypes = {
  imageNode: PropTypes.instanceOf(Element).isRequired,
  quill: PropTypes.object.isRequired,
};

export default ImageEditor;
