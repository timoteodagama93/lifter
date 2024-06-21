import { Dialog, Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import { BsEmojiAngry, BsEmojiKiss, BsEmojiHeartEyes } from 'react-icons/bs';
import { HiOutlineEmojiHappy, HiOutlineEmojiSad } from 'react-icons/hi';
import Swal from 'sweetalert2';
import EnviarEstrelas from './EnviarEstrelas';
import PrimaryButton from './PrimaryButton';
import { FaFacebook } from 'react-icons/fa';
import ChannelsOfColaboration from './ChannelsOfColaboration';

function Valuate({
  collectionType = 'song',
  collection,
  isOpen,
  onClose,
  maxWidth = '2xl',
}) {
  const maxWidthClass = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
  }[maxWidth];

  if (typeof window === 'undefined') {
    return null;
  }

  const form = useForm({
    collection_id: collection.id,
    collection_type: collectionType,
    points: 0,
    emotions: 'HiOutlineEmojiHappy',
    feedback: '',
    colaborate: 'YES',
    negative: false,
    why_negative: '',
  });
  function submit(e) {
    e.preventDefault();
    console.log(form.data);

    const r = form.post('valuate-colletion', {
      onSuccess: response => {
        onClose(false);
        Swal.fire({
          title: 'Avaliação enviada',
          text: 'Obrigado por seu trabalho. O criador e os demais usuários agradecem. ',
          icon: 'success',
        });
      },
      onFinish: response => {
        onClose(false);
        Swal.fire({
          title: 'Avaliação enviada',
          text: 'Obrigado por seu trabalho. O criador e os demais usuários agradecem. ',
          icon: 'success',
        });
      },
      onError: error => {
        Swal.fire({
          title: 'Erro',
          text: 'Alguma coisa correu mal, reenvie o seu feedback, nós os amantes de músicas agradecemos sua paciência.',
          icon: 'error',
        });
      },
    });

    console.log(r);
  }

  return ReactDOM.createPortal(
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={isOpen}
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-3xl opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={classNames(
                'inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full',
                maxWidthClass,
              )}
            >
              <>
                <div className="w-full justify-start p-2 flex flex-col">
                  <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
                    <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                      Como avalia isto?
                    </h1>
                    <p>
                      Faça uma avaliação com base no conteúdo que ouviu. Avalie
                      em termos emocionais, qualidade na produção, conteúdo,
                      etc. E claro, se gostou, não se esqueça de partilhar e
                      recomendar.
                    </p>
                  </div>

                  <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
                    <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                      Quantas estrelas merece?
                    </h1>
                    <EnviarEstrelas
                      collection={collection}
                      collectionType={collectionType}
                      wich_flex="flex-row "
                    />
                  </div>
                  <form
                    onSubmit={e => submit(e)}
                    className="w-full flex flex-col justify-start text-base items-center p-5 space-y-2"
                  >
                    <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
                      <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                        Qual é a pontuação?
                      </h1>
                      <label className="mx-5" htmlFor="nota">
                        {form.data.points + ' '}pontos
                      </label>
                      <input
                        required
                        value={form.data.points}
                        onChange={e =>
                          form.setData(
                            'points',
                            Number.parseInt(e.target.value),
                          )
                        }
                        type="range"
                      />
                    </div>
                    <div>
                      <div className="my-4 w-full flex flex-col rounded p-2">
                        <label htmlFor="colaborate">
                          Qual é a sua decisão quanto a colaborar na divulgação?
                        </label>
                        <select
                          required
                          defaultValue="YES"
                          name="colaborate"
                          id="colaborate"
                          value={form.data.colaborate}
                          onChange={e =>
                            form.setData('colaborate', e.currentTarget.value)
                          }
                        >
                          <option value="YES">Vou Colaborar</option>
                          <option value="NO">Não vou colaborar</option>
                        </select>
                      </div>
                      <div className="my-4 w-full flex flex-col rounded p-2  ">
                        <label htmlFor="feedback">
                          Justifique sua decisão com uma crítica construtiva e
                          valiosa para o artista.
                        </label>
                        <textarea
                          required
                          name="feedback"
                          id="feedback"
                          value={form.data.feedback}
                          onChange={e =>
                            form.setData('feedback', e.currentTarget.value)
                          }
                          className="bg-white dark:bg-black text-black dark:text-gray-400 p-2"
                        ></textarea>
                      </div>
                    </div>

                                <ChannelsOfColaboration collectionId={collection.id} />

                    <div className="my-1 w-full text-base text-black  bg-[#fff] rounded relative flex flex-col gap-1 p-5 shadow">
                      <h1 className="text-xl md:text-2xl font-bold text-[#4c88c4]  ">
                        Gerou-lhe alguma emoção?
                      </h1>
                      <div className="w-full gap-1 flex flex-row justify-center">
                        <span
                          className={`cursor-pointer ${
                            form.data.emotions === 'HiOutlineEmojiHappy'
                              ? 'text-[#f6cc33]'
                              : ''
                          } `}
                          onClick={() =>
                            form.setData('emotions', 'HiOutlineEmojiHappy')
                          }
                        >
                          <HiOutlineEmojiHappy className="w-16 h-16" />{' '}
                          Felicidade
                        </span>
                        <span
                          className={`cursor-pointer ${
                            form.data.emotions === 'HiOutlineEmojiSad'
                              ? 'text-[#f6cc33]'
                              : ''
                          } `}
                          onClick={() =>
                            form.setData('emotions', 'HiOutlineEmojiSad')
                          }
                        >
                          <HiOutlineEmojiSad className="w-16 h-16" /> Tristeza
                        </span>
                        <span
                          className={`cursor-pointer ${
                            form.data.emotions === 'BsEmojiAngry'
                              ? 'text-[#f6cc33]'
                              : ''
                          } `}
                          onClick={() =>
                            form.setData('emotions', 'BsEmojiAngry')
                          }
                        >
                          <BsEmojiAngry className="w-14 h-14" /> Raíva
                        </span>
                        <span
                          className={`cursor-pointer ${
                            form.data.emotions === 'BsEmojiKiss'
                              ? 'text-[#f6cc33]'
                              : ''
                          } `}
                          onClick={() =>
                            form.setData('emotions', 'BsEmojiKiss')
                          }
                        >
                          <BsEmojiKiss className="w-14 h-14" />
                          Paixão
                        </span>
                        <span
                          className={`cursor-pointer ${
                            form.data.emotions === 'BsEmojiHeartEyes'
                              ? 'text-[#f6cc33]'
                              : ''
                          } `}
                          onClick={() =>
                            form.setData('emotions', 'BsEmojiHeartEyes')
                          }
                        >
                          {' '}
                          <BsEmojiHeartEyes className="w-14 h-14" />
                          Amor
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="my-4 bg-red-900 text-white w-full rounded p-2 text-bold ">
                        <input
                          value={form.data.negative}
                          onChange={e => {
                            if (form.data.negative == false) {
                              form.setData('negative', true);
                            } else {
                              form.setData('negative', false);
                            }
                          }}
                          type="checkbox"
                          className="bg-white text-black p-2"
                        />{' '}
                        <label>
                          Selecione está opção se considerar o conteúdo como
                          negativo e impróprio
                        </label>
                        {form.data.negative === true && (
                          <div className="w-full flex text-black">
                            <input
                              value={form.data.why_negative}
                              onChange={e =>
                                form.setData('why_negative', e.target.value)
                              }
                              className="w-full"
                              type="text"
                              placeholder="Justifique por qual razão o conteúdo é negativo."
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <PrimaryButton>Concluir avaliação</PrimaryButton>
                  </form>
                </div>
              </>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>,
    document.body,
  );
}

export default Valuate;
