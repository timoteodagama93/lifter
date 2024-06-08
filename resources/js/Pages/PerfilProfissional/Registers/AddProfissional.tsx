import React, { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import useTypedPage from '@/Hooks/useTypedPage';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SectionBorder from '@/Components/SectionBorder';
import { BiArrowBack } from 'react-icons/bi';
import SecondaryButton from '../../../Components/SecondaryButton';
import Swal from 'sweetalert2';
import Loader from '../../../Components/Loader';
import { useStateContext } from '@/contexts/PaginaActualContext';
import Welcome from './Welcome';
import Profissional from '../Outros/Index';
import { countries } from 'countries-list';
import route from 'ziggy-js';
import Checkbox from '@/Components/Checkbox';
export default function AddProfissional({}) {
  const page = useTypedPage();
  const { setCurrentPage } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  const paises = [...Object.values(countries)];

  const formProfissional = useForm({
    _method: 'POST',
    name: page?.props?.auth?.user?.name,
    category: 'Produtora',
    contact: '',
    about: '',
    country: 'Angola',
    city: 'Luanda',
    terms: false,
    cover: null as File | null,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    formProfissional.processing ? setIsLoading(true) : setIsLoading(false);

    formProfissional.post('register-profissional', {
      onError: errors => {
        Swal.fire({
          title: 'Alguma coisa correu mal',
          text: 'Não foi possível criar a conta, alguma coisa correu mal. Estamos a trabalhar para resolver isso, por enquanto recarregue a página..',
          icon: 'error',
        });
      },
      onSuccess: response => {
        formProfissional.reset();
        clearPhotoFileInput();
        setIsLoading(false);
        setCurrentPage(<Profissional />);
        Swal.fire({
          title: 'Sucesso',
          text: 'Conta criada, recarregue a página.',
          icon: 'success',
        });
        window.location.reload();
      },
      onProgress: () => {
        setIsLoading(true);
      },
      onFinish: result => {
        console.log(result);
      },
    });
    formProfissional.processing ? setIsLoading(true) : setIsLoading(false);
  }
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  function selectNewPhoto() {
    photoRef.current?.click();
  }

  const [photo, setPhoto] = useState(photoRef.current?.files?.[0]);
  function updatePhotoPreview() {
    setPhoto(photoRef.current?.files?.[0]);
    if (!photo) {
      return;
    }

    formProfissional.setData('cover', photo);
    const reader = new FileReader();

    reader.onload = e => {
      setPhotoPreview(e.target?.result as string);
    };

    reader.readAsDataURL(photo);
  }
  function clearPhotoFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = '';
      formProfissional.setData('cover', null);
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="relative flex justify-center items-center bg-gradient-to-br from-[.#f6cc33] to-[.#f6cc33] text-[.#4c88c4] text-bold  z-50 top-0 left-0 w-full h-full flex-col">
          <Loader title="Criando a conta..." />
          <p className="text-base">
            Estamos a deixar tudo pronto para si, aguarde enquanto o processo
            finaliza!
          </p>
        </div>
      ) : (
        <>
          <div className="p-5 m-1 shadow-lg shadow-black">
            <p className="w-full text-xl flex justify-between uppercase gap-5">
              <button
                onClick={() => setCurrentPage(<Welcome />)}
                className="transform-effect px-5 "
              >
                <BiArrowBack className="text-xl" />
              </button>
              <span>Juntar-se à rede Lifter</span>
            </p>

            <SectionBorder></SectionBorder>
            <form onSubmit={onSubmit} className="" encType="multipart/form-data">
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

              {formProfissional.progress && (
                <progress
                  value={formProfissional.progress.percentage}
                  max={100}
                >
                  {formProfissional.progress.percentage}%
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

                <SecondaryButton
                  className="m-2"
                  type="button"
                  onClick={selectNewPhoto}
                >
                  Selecionar Imagem
                </SecondaryButton>

                <InputError message="" className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="name">Nome profissional</InputLabel>
                <span className="">Nome mais conhecido ciclo profissional</span>
                <TextInput
                  id="name"
                  type="text"
                  className="mt-1 block w-full"
                  value={formProfissional.data.name}
                  onChange={e =>
                    formProfissional.setData('name', e.currentTarget.value)
                  }
                  required
                  autoComplete="new-password"
                />
                <InputError
                  className="mt-2"
                  message={formProfissional.errors.name}
                />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="category">
                  Categoria profissional
                </InputLabel>
                <select
                  id="category"
                  className="mt-1 block w-full text-black"
                  value={formProfissional.data.category}
                  onChange={e =>
                    formProfissional.setData('category', e.currentTarget.value)
                  }
                  required
                >
                  <option>Produtor</option>
                  <option>Agente</option>
                  <option>DJ</option>
                  <option>Influenciador</option>
                  <option>Promotor</option>
                  <option>Blogueiro</option>
                </select>
                <InputError
                  className="mt-2"
                  message={formProfissional.errors.category}
                />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="contact">Contacto </InputLabel>
                <span>Indicativo de país, ex: Angola - (+244)</span>
                <TextInput
                  id="contact"
                  type="text"
                  className="mt-1 block w-full"
                  value={formProfissional.data.contact}
                  onChange={e =>
                    formProfissional.setData('contact', e.currentTarget.value)
                  }
                  required
                  autoComplete="new-password"
                />
                <InputError
                  className="mt-2"
                  message={formProfissional.errors.contact}
                />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="country">País</InputLabel>
                <select
                  id="country"
                  className="mt-1 block w-full text-black"
                  value={formProfissional.data.country}
                  onChange={e =>
                    formProfissional.setData('country', e.currentTarget.value)
                  }
                  defaultValue="Angola"
                  required
                >
                  {paises.map(country => (
                    <option value={country.name + ':' + country.phone}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <InputError
                  className="mt-2"
                  message={formProfissional.errors.country}
                />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="city">Cidade</InputLabel>
                <select
                  id="city"
                  className="mt-1 block w-full text-black"
                  value={formProfissional.data.city}
                  onChange={e =>
                    formProfissional.setData('city', e.currentTarget.value)
                  }
                  required
                >
                  <option value="luanda">Luanda</option>
                  <option value="benguela">Benguela</option>
                  <option value="malanje">Malanje</option>
                  <option value="huila">Huila</option>
                  <option value="bengo">Bengo</option>
                  <option value="bie">Bíe</option>
                  <option value="moxico">Moxico</option>
                  <option value="zaire">Zaire</option>
                  <option value="uige">Uíge</option>
                  <option value="cuanza-norte">Cuanza Norte</option>
                  <option value="cuanza-sul">Cuanza Sul</option>
                  <option value="lunda-norte">Luanda Norte</option>
                  <option value="lunda-sul">Lunda Sul</option>
                  <option value="cunene">Cunene</option>
                  <option value="cunene">Outra</option>
                </select>
                <InputError
                  className="mt-2"
                  message={formProfissional.errors.country}
                />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="about">Sobre o profissional</InputLabel>
                <span>Destaques metas que alcançou profissionalmente. </span>
                <textarea
                  id="about"
                  className="mt-1 block w-full text-black"
                  value={formProfissional.data.about}
                  onChange={e =>
                    formProfissional.setData('about', e.currentTarget.value)
                  }
                  required
                />
                <InputError
                  className="mt-2"
                  message={formProfissional.errors.about}
                />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="terms">
                  <div className="flex items-center">
                    <Checkbox
                      name="terms"
                      id="terms"
                      checked={formProfissional.data.terms}
                      onChange={e =>
                        formProfissional.setData(
                          'terms',
                          e.currentTarget.checked,
                        )
                      }
                      required
                    />

                    <div className="ml-2   rounded-md ">
                      Concordo com os{' '}
                      <a
                        target="_blank"
                        href={route('terms.show')}
                        className="underline text-sm  hover:text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                      >
                        Termos de serviços
                      </a>{' '}
                      e{' '}
                      <a
                        target="_blank"
                        href={route('policy.show')}
                        className="underline text-sm  hover:text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                      >
                        Politicas de privacidade
                      </a>
                    </div>
                  </div>
                  <InputError
                    className="mt-2"
                    message={formProfissional.errors.terms}
                  />
                </InputLabel>
              </div>

              <div className="flex items-center justify-end mt-4">
                <PrimaryButton
                  className={classNames('ml-4', {
                    'opacity-25': formProfissional.processing,
                  })}
                  disabled={formProfissional.processing}
                >
                  Criar perfil
                </PrimaryButton>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
