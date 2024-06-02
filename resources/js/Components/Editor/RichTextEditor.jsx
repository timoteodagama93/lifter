import React, { useState, useCallback, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';
import './RichTextEditor.css';
import ImageEditor from './ImageEditor';
import axios from 'axios';
import { useForm } from '@inertiajs/react';

// Custom Image Blot
const Image = Quill.import('formats/image');

class CustomImage extends Image {
  static create(value) {
    const node = super.create(value);
    node.setAttribute('style', 'max-width: 100%; height: auto;');
    return node;
  }
}

Quill.register(CustomImage, true);

const RichTextEditor = () => {
  const [value, setValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const quillRef = useRef(null);

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
  };

  const f = useForm({
    article_title: ""
  })

  const onDrop = useCallback(acceptedFiles => {
    const quill = quillRef.current.getEditor();
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const url = e.target.result;
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', url);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleImageClick = e => {
    if (e.target.tagName === 'IMG') {
      setSelectedImage(e.target);
    } else {
      setSelectedImage(null);
    }
  };

  const handleSave = () => {
    let article_title = document.getElementById("article_title");
    console.log(article_title.value);
    axios
      .post('/create-article', { html: value, article_title: article_title.value })
      .then(res => { })
      .catch(err => { });
    //localStorage.setItem('savedContent', value);
    alert('Conteúdo salvo!');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*,audio/*,video/*',
  });

  return (
    <div className="container mx-auto p-4" onClick={handleImageClick}>
      <div className='w-full flex flex-col justify-start items-center'>
        <label for="article_title">Titulo ou tema do Artigo</label>
        <input type="text" onChange={(e) => f.setData("article_title", e.currentTarget.value)} name="article_title" id='article_title' value={f.data.article_title} />
      </div>

      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p className="text-center text-gray-500 p-4 border border-dashed rounded">
          Arraste e solte arquivos de imagem, áudio ou vídeo aqui, ou clique
          para selecionar arquivos.
        </p>
      </div>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ align: [] }],
            ['link', 'image', 'video'],
            ['clean'],
          ],
        }}
        formats={[
          'header',
          'font',
          'size',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'list',
          'bullet',
          'indent',
          'link',
          'image',
          'video',
          'audio',
          'align',
        ]}
      />
      {selectedImage && (
        <ImageEditor
          imageNode={selectedImage}
          quill={quillRef.current.getEditor()}
        />
      )}
      <div className="mt-4 bg-gray-100 p-24 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Preview:</h2>
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </div>
      <button
        className="mt-4 bg-blue-500 text-white p-2 rounded"
        onClick={handleSave}
      >
        Salvar Conteúdo
      </button>
    </div>
  );
};

export default RichTextEditor;
