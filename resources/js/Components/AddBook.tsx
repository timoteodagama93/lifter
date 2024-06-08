import React, { useRef, useState } from 'react';
import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import AuthenticationCard from '@/Components/AuthenticationCard';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SectionBorder from '@/Components/SectionBorder';
import { BiArrowBack, BiHappy, BiUpload } from 'react-icons/bi';
import { router } from '@inertiajs/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Loader } from '@/Components';
import SecondaryButton from './SecondaryButton';
import RichTextEditor from './Editor/RichTextEditor';
import { BsFilePdf, BsFileRichtext } from 'react-icons/bs';

export default function AddBook({ estante }) {
  const [successOnAdd, setSuccessOnAdd] = useState(false);
  const page = useTypedPage();

  const formBook = useForm({
    estante_id: estante?.id,
    title: '',
    category: '',
    resume: '',
    pdf: null as File | null,
    cover: null as File | null,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    formBook.post('save-estante-book', {
      onSuccess: () => {
        formBook.reset();
        formBook.setData('title', '');
        clearSongFileInput();
        setSuccessOnAdd(true);
        Swal.fire({
          title: 'Bem feito',
          text: 'A música foi carregada. Ela fica disponível na plataforma tão logo que a aprovarmos.',
          icon: 'success',
        });
        window.location.reload();
      },
      onError: e => {},
      onFinish: r => {},
    });
  }

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);

  function selectNewPhoto() {
    photoRef.current?.click();
  }
  function selectNewPDF() {
    pdfRef.current?.click();
  }

  function updatePhotoPreview() {
    const photo = photoRef.current?.files?.[0];

    if (!photo) {
      return;
    }

    formBook.setData('cover', photo);

    const reader = new FileReader();

    reader.onload = e => {
      setPhotoPreview(e.target?.result as string);
    };

    reader.readAsDataURL(photo);
  }

  function updateFilePDF() {
    const pdf = pdfRef.current?.files?.[0];

    if (!pdf) {
      return;
    }

    formBook.setData('cover', pdf);

    const reader = new FileReader();

    reader.onload = e => {
      setPhotoPreview(e.target?.result as string);
    };

    reader.readAsDataURL(pdf);
  }
  function clearSongFileInput() {
    if (pdfRef.current?.value) {
      pdfRef.current.value = '';
      formBook.setData('pdf', null);
    }
  }

  if (formBook.processing)
    return (
      <div className="flex flex-col justify-center w-full h-full">
        <Loader title="Enviando a música..." />
        <progress value={formBook.progress?.percentage}>
          {' '}
          {formBook.progress?.percentage}{' '}
        </progress>
        <p className="text-base">
          Dependendo da sua Internet, o processo pode demorar.
        </p>
      </div>
    );

  const [editar, setEdita] = useState(true);
  return (
    <>
      {successOnAdd === true ? (
        <>
          <h1>O livro ou item foi adicionada à sua estante com sucesso!</h1>
          <PrimaryButton onClick={() => setSuccessOnAdd(false)}>
            Adicionar outro item?
          </PrimaryButton>
        </>
      ) : (
        <>
          <div className="w-full h-full flex justify-between items-center p-1 md:px-5 border-b">
            <button
              onClick={() => {}}
              className="transform-effect p-1 justify-center items-center flex flex-col"
            >
              {' '}
              <BiArrowBack className="w-10 h-auto font-bold" />{' '}
            </button>
            <h1 className="text-center font-bold text-4xl">
              {editar === true ? 'Editor de texto' : 'Carregar PDF'}
            </h1>

            <div className="flex flex-row justify-center items-center gap-5">
              {editar === true ? (
                <>
                  {' '}
                  {page.props.auth.user?.id == estante.user_id && (
                    <button
                      onClick={() => setEdita(false)}
                      className="transform-effect p-1 justify-center items-center w-full flex flex-col"
                    >
                      <BsFilePdf className="w-10 h-auto font-bold" />{' '}
                      <span className="flex">Carregar PDF</span>
                    </button>
                  )}
                </>
              ) : (
                <>
                  {' '}
                  {page.props.auth.user?.id == estante.user_id && (
                    <button
                      onClick={() => setEdita(true)}
                      className="transform-effect p-1 justify-center items-center w-full flex flex-col"
                    >
                      <BsFileRichtext className="w-10 h-auto font-bold" />{' '}
                      <span className="flex">Editor de texto</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          {editar === true ? (
            <RichTextEditor type="book" collection_id={estante.id} />
          ) : (
            <div className="p-1 md:p-5 shadow-lg shadow-black w-full h-full overflow-y-auto overflow-x-hidden flex flex-col">
              <p className="w-full text-xl flex flex-row justify-center uppercase gap-1">
                Novo livro ou item
              </p>
              <SectionBorder></SectionBorder>
              <form
                onSubmit={onSubmit}
                className=""
                encType="multipart/form-data"
              >
                {photoPreview ? (
                  // <!-- New Profile Photo Preview -->
                  <div className="">
                    <span
                      className="block rounded-lg w-36 h-36 "
                      style={{
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        backgroundImage: `url('${photoPreview}')`,
                      }}
                    ></span>
                  </div>
                ) : (
                  ''
                )}

                {formBook.progress && (
                  <progress value={formBook.progress.percentage} max={100}>
                    {formBook.progress.percentage}%
                  </progress>
                )}

                <div className="col-span-6 sm:col-span-4">
                  {/* <!-- Profile Photo File Input --> */}
                  <input
                    type="file"
                    className="hidden"
                    ref={photoRef}
                    onChange={updatePhotoPreview}
                  />

                  <InputLabel htmlFor="file" value="Ficheiro" />
                  <InputError className="mt-2" message={formBook.errors.pdf} />

                  <SecondaryButton
                    className="m-2"
                    type="button"
                    onClick={selectNewPhoto}
                  >
                    Selecionar imagem de capa
                  </SecondaryButton>
                </div>

                <SectionBorder />
                <div className="col-span-6 sm:col-span-4">
                  {/* <!-- Profile Photo File Input --> */}
                  <input
                    type="file"
                    className=""
                    ref={photoRef}
                    onChange={updateFilePDF}
                  />

                  <InputLabel htmlFor="file" value="Ficheiro PDF" />
                  <InputError className="mt-2" message={formBook.errors.pdf} />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="title">Título da da obra </InputLabel>
                  <span className="hidden">Título da obra </span>
                  <TextInput
                    id="title"
                    type="text"
                    className="mt-1 block w-full"
                    value={formBook.data.title}
                    onChange={e =>
                      formBook.setData('title', e.currentTarget.value)
                    }
                    required
                  />
                  <InputError
                    className="mt-2"
                    message={formBook.errors.title}
                  />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="category">Categoria</InputLabel>
                  <select
                    id="category"
                    className="mt-1 block w-full"
                    value={formBook.data.category}
                    onChange={e =>
                      formBook.setData('category', e.currentTarget.value)
                    }
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Poesia">Poesia</option>
                    <option value="Romance">Romance</option>
                    <option value="Drama">Drama</option>
                    <option value="Ficção">Ficção</option>
                    <option value="Investigação">Investigação</option>
                    <option value="Informação">Informação</option>
                  </select>
                  <InputError
                    className="mt-2"
                    message={formBook.errors.category}
                  />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="letra">Resumo do livro</InputLabel>
                  <span>Opcional. </span>
                  <textarea
                    id="letra"
                    className="mt-1 block w-full text-black"
                    value={formBook.data.resume}
                    onChange={e =>
                      formBook.setData('resume', e.currentTarget.value)
                    }
                  />
                  <InputError
                    className="mt-2"
                    message={formBook.errors.resume}
                  />
                </div>

                <div className="flex items-center justify-end mt-4">
                  <PrimaryButton
                    className={classNames('ml-4', {
                      'opacity-25': formBook.processing,
                    })}
                    disabled={formBook.processing}
                  >
                    Publicar livro
                  </PrimaryButton>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
}
