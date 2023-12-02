import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useForm } from '@inertiajs/react';
import { random } from 'lodash';
import InputLabel from '../../../../Components/InputLabel';
import InputError from '../../../../Components/InputError';
import route from 'ziggy-js';
import Checkbox from '../../../../Components/Checkbox';
import Swal from 'sweetalert2';
import { Loader } from '@/Components';
import axios from 'axios';

function SongEvaluationSetup({ onClose, song }) {
  const [page, setPage] = useState(<Historico song={song} />);
  const changePage = pageTo => {
    if (page.type.name == pageTo) return;
    if (pageTo == 'Historico') setPage(<Historico song={song} />);
    if (pageTo == 'NovoPedido') setPage(<NovoPedido song={song} />);
    console.log(pageTo);
  };
  return (
    <div className="w-full h-full absolute top-0 left-0 bg-[#4c88c4] ">
      <div className="p-1  shadow-lg shadow-black justify-between items-center w-full flex">
        <div className="flex">
          <button
            onClick={() => onClose(false)}
            className="transform-effect p-1 justify-center items-center w-full flex flex-col"
          >
            <BiArrowBack className="w-5 md:w-7 h-auto font-bold" />
            <span style={{ fontSize: '.5rem' }} className="hidden md:flex">
              Cancelar
            </span>
          </button>
        </div>
        <div className="flex  justify-center flex-col">
          <div className="flex justify-center flex-row gap-2 p-2">
            <button
              onClick={() => changePage('Historico')}
              className="text-xl uppercase transform-effect p-1"
            >
              Histórico
            </button>
            <button
              onClick={() => changePage('NovoPedido')}
              className="text-xl uppercase transform-effect p-1"
            >
              Novo pedido
            </button>
          </div>
          <p>
            A música actual será submetida para avaliação segundo o perfil de
            usuários que definir.
          </p>
        </div>
      </div>

      <div className="pt-2">{page}</div>
    </div>
  );
}

export default SongEvaluationSetup;

const Historico = ({ song }) => {
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios
      .post('get-campaigns', { song_id: song.id })
      .then(response => {
        setLoading(false);
        setCampaigns(response.data);
      })
      .catch(errors => {
        console.log(errors);
      });
  }, []);
  return (
    <>
      {loading ? (
        <Loader title="Carregando pedidos" />
      ) : (
        <>
          <h1 className="text-xl w-full justify-center items-center text-center">
            Historico de pedidos de avaliações
          </h1>

          <table className="w-full table">
            <thead className="thead-dark">
              <tr className="">
                <th aria-sort="ascending" className="">
                  Código de requisição
                </th>
                <th aria-sort="ascending" className="">
                  Data
                </th>
                <th aria-sort="ascending" className="">
                  Respostas obtidas
                </th>
                <th aria-sort="ascending" className="">
                  Interações gerais
                </th>
              </tr>
            </thead>
            <tbody>
              {campaigns?.map(campaign => (
                <tr className="odd:bg-white p-1 odd:text-gray-900 even:bg-slate-500">
                  <td>{campaign.codigo}</td>
                  <td>{campaign.created_at}</td>
                  <td>{campaign.age}</td>
                  <td>
                    <div className="flex flex-row gap-1">0</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
const NovoPedido = ({ song }) => {
  const [valuation, setValuation] = useState();
  const form = useForm({
    song_id: song.id,
    codigo: random(10, 99) + new Date().getTime() + random(10, 99) + '',
    age: 15,
    gender: 'Ambos',
    ocupation: 'Qualquer',
    formation: 'Qualquer',
    location: 'Qualquer',

    goals: 'Avaliações',
    goal_size: 0,
    days: 0,

    lifter: 0,
    produtoras: 0,
    djs: 0,
    influencers: 0,
    agentes: 0,
    prmotores: 0,
    blogueiros: 0,

    interna: 0,
    facebook: 0,
    tiktok: 0,
    instagram: 0,
    youtube: 0,

    budget: 0,
    notes: '',

    terms: false,
  });
  const updateOrCreate = () => {
    form.post('new-campaign', {
      onSuccess: () => {
        Swal.fire({
          title: 'Avaliação criada',
          text: 'Sua música foi submetida e os usuários escolheidos foram notificados.',
          icon: 'success',
        });
      },
    });
  };

  const passos = [
    {
      name: 'Público Alvo',
      componente: <Publico form={form} updateOrCreate={updateOrCreate} />,
    },
    {
      name: 'Metas',
      componente: <Metas form={form} updateOrCreate={updateOrCreate} />,
    },
    {
      name: 'Parceiros',
      componente: <Parceiros form={form} updateOrCreate={updateOrCreate} />,
    },
    {
      name: 'Plataformas',
      componente: <Plataformas form={form} updateOrCreate={updateOrCreate} />,
    },
    {
      name: 'Orçamento',
      componente: <Orcamento form={form} updateOrCreate={updateOrCreate} />,
    },
    {
      name: 'Resumo',
      componente: <Resumo form={form} updateOrCreate={updateOrCreate} />,
    },
  ];
  const [step, setStep] = useState(0);

  const prevStep = () => {
    setStep(step - 1);
  };
  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between m-2 mx-10 text-xl border-b">
        <button
          onClick={prevStep}
          className={`transform-effect p-2 ${step === 0 ? 'hidden' : 'flex'}  `}
          disabled={step === 0 ? true : false}
        >
          Anterior
        </button>
        <div className="flex flex-row justify-center items-center gap-1">
          <span className="shadow-lg border rounded-full w-10 h-10 justify-center items-center flex">
            {' '}
            {step + 1}
            {'/'}
            {passos.length}
          </span>
          <span className="hidden md:flex">{passos[step].name}</span>
        </div>
        {step === passos.length - 1 ? (
          <button
            onClick={nextStep}
            className={`transform-effect p-2 ${
              step === passos.length - 1 ? 'hidden' : 'flex'
            }   `}
            disabled={step === passos.length - 1 ? true : false}
          >
            Requisitar avaliação
          </button>
        ) : (
          <button
            onClick={nextStep}
            className={`transform-effect p-2 ${
              step === passos.length - 1 ? 'hidden' : 'flex'
            }  `}
            disabled={step === passos.length - 1 ? true : false}
          >
            Seguinte
          </button>
        )}
      </div>
      <div className="w-full flex justify-center items-center ">
        {passos[step].componente}
      </div>
    </div>
  );
};

const Publico = ({ form, updateOrCreate }) => {
  return (
    <>
      <div className="w-full h-full justify-center flex items-center">
        <div
          onSubmit={updateOrCreate}
          className="w-full flex flex-col mx-1 md:mx-5 text-black"
        >
          <div className="w-full flex flex-col shadow-lg m-1">
            <label htmlFor="age">Faixa etária do público alvo</label>
            <input
              type="number"
              name="age"
              id="age"
              onChange={e => {
                form.setData('age', e.target.value);
              }}
              value={form.data.age}
            />
            <InputError message={form.errors.age} />
          </div>
          <div className="w-full flex flex-col shadow-lg m-1">
            <InputLabel value="Género" htmlFor="gender" />
            <select
              name="gender"
              id="gender"
              value={form.data.gender}
              onChange={e => {
                form.setData('gender', e.target.value);
              }}
            >
              <option>Ambos</option>
              <option>Feminino</option>
              <option>Masculino</option>
            </select>
          </div>
          <div className="w-full flex flex-col shadow-lg m-1">
            <InputLabel value="Ocupação" htmlFor="ocupation" />
            <select
              name="ocupation"
              id="ocupation"
              value={form.data.ocupation}
              onChange={e => {
                form.setData('ocupation', e.target.value);
              }}
            >
              <option>Qualquer</option>
              <option>Estudante</option>
              <option>Desempregado</option>
              <option>Empregado</option>
            </select>
          </div>
          <div className="w-full flex flex-col shadow-lg m-1">
            <InputLabel value="Formação" htmlFor="formation" />
            <select
              name="formation"
              id="formation"
              value={form.data.formation}
              onChange={e => {
                form.setData('formation', e.target.value);
              }}
            >
              <option>Qualquer</option>
              <option>Primária (até 6ª) </option>
              <option>Iº Ciclo (7ª-9ª Classe)</option>
              <option>IIº Ciclo (Ensino médio)</option>
              <option>Universitário</option>
              <option>Pós-graduado</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

const Metas = ({ form, updateOrCreate }) => {
  return (
    <>
      <div className="w-full h-full justify-center flex items-center">
        <div
          action=""
          onSubmit={updateOrCreate}
          className="w-full flex flex-col mx-1 md:mx-5 text-black"
        >
          <div className="w-full flex flex-col shadow-lg m-1">
            <InputLabel
              value="Objectivos a alcançar com a campanha"
              htmlFor="goals"
            />
            <select
              name="goals"
              id="goals"
              value={form.data.goals}
              onChange={e => {
                form.setData('goals', e.target.value);
              }}
              defaultValue="Avaliações"
            >
              <option>Avaliações</option>
              <option>Downloads</option>
              <option>Reproduções</option>
              <option>Partilhas</option>
              <option>Recomendações</option>
            </select>
            <InputError message={form.errors.goas} />
          </div>
          <div className="w-full flex flex-col shadow-lg m-1">
            <InputLabel value="Executar por quantos dias?" htmlFor="days" />
            <input
              type="number"
              name="days"
              id="days"
              value={form.data.days}
              onChange={e => {
                form.setData('days', e.target.value);
              }}
            />
          </div>
          <div className="w-full flex flex-col shadow-lg m-1">
            <InputLabel
              value="Quantas pessoas gostaria de alcançar?"
              htmlFor="goals_size"
            />
            <input
              type="number"
              name="goals_size"
              id="goals_size"
              value={form.data.goals_size}
              onChange={e => {
                form.setData('goals_size', e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Parceiros = ({ form, updateOrCreate }) => {
  return (
    <>
      <div className="w-full h-full justify-center flex flex-col items-center">
        <h1 className="text-center text-xl">
          Marque todos os parceiros de quem gostaria de obter colaboração ou
          ação{' '}
        </h1>
        <div
          action=""
          onSubmit={updateOrCreate}
          className="w-full flex flex-wrap mx-1 md:mx-5  gap-2 text-xl"
        >
          <div className="flex flex-row shadow-lg m-1 justify-center items-center">
            <input
              type="checkbox"
              name="lifter"
              id="lifter"
              onChange={e => {
                form.setData('lifter', e.target.value);
              }}
              value={form.data.lifter}
            />
            <InputLabel htmlFor="lifter" value="Equipa Lifter" />
            <InputError message={form.errors.lifter} />
          </div>
          <div className="flex flex-row shadow-lg m-1 justify-center items-center">
            <input
              type="checkbox"
              name="produtoras"
              id="produtoras"
              onChange={e => {
                form.setData('produtoras', e.target.value);
              }}
              value={form.data.produtoras}
            />
            <InputLabel htmlFor="produtoras" value="Produtoras" />
            <InputError message={form.errors.produtoras} />
          </div>
          <div className="flex flex-row shadow-lg m-1 justify-center items-center">
            <input
              type="checkbox"
              name="djs"
              id="djs"
              onChange={e => {
                form.setData('djs', e.target.value);
              }}
              value={form.data.djs}
            />
            <InputLabel htmlFor="djs" value="DJs" />
            <InputError message={form.errors.djs} />
          </div>
          <div className="flex flex-row shadow-lg m-1 justify-center items-center">
            <input
              type="checkbox"
              name="influencers"
              id="influencers"
              onChange={e => {
                form.setData('influencers', e.target.value);
              }}
              value={form.data.influencers}
            />
            <InputLabel htmlFor="influencers" value="Influencers" />
            <InputError message={form.errors.influencers} />
          </div>
          <div className="flex flex-row shadow-lg m-1 justify-center items-center">
            <input
              type="checkbox"
              name="agentes"
              id="agentes"
              onChange={e => {
                form.setData('agentes', e.target.value);
              }}
              value={form.data.agentes}
            />
            <InputLabel htmlFor="agentes" value="Agentes" />
            <InputError message={form.errors.agentes} />
          </div>
          <div className="flex flex-row shadow-lg m-1 justify-center items-center">
            <input
              type="checkbox"
              name="promotores"
              id="promotores"
              onChange={e => {
                form.setData('promotores', e.target.value);
              }}
              value={form.data.prmotores}
            />
            <InputLabel htmlFor="promotores" value="Promotores" />
            <InputError message={form.errors.promotores} />
          </div>
          <div className="flex flex-row shadow-lg m-1 justify-center items-center">
            <input
              type="checkbox"
              name="blogueiros"
              id="blogueiros"
              onChange={e => {
                form.setData('blogueiros', e.target.value);
              }}
              value={form.data.blogueiros}
            />
            <InputLabel htmlFor="blogueiros" value="Blogueiros" />
            <InputError message={form.errors.blogueiros} />
          </div>
        </div>
      </div>
    </>
  );
};

const Plataformas = ({ form, updateOrCreate }) => {
  return (
    <>
      <div className="w-full h-full justify-center flex flex-col items-center">
        <h1 className="text-center text-xl">
          Marque todos as plataformas nas quais gostaria de executar as ações de
          marketing{' '}
        </h1>
        <div
          action=""
          onSubmit={updateOrCreate}
          className="w-full flex flex-wrap mx-1 md:mx-5  gap-2 text-xl"
        >
          <div className="flex flex-row shadow-lg m-1 justify-center items-center">
            <input
              type="checkbox"
              name="interna"
              id="interna"
              onChange={e => {
                form.setData('interna', e.target.value);
              }}
              value={form.data.interna}
            />
            <InputLabel htmlFor="interna" value="Na Lifter" />
            <InputError message={form.errors.interna} />
          </div>
          <div className="flex flex-row shadow-lg m-1 justify-center items-center">
            <input
              type="checkbox"
              name="facebook"
              id="facebook"
              onChange={e => {
                form.setData('facebook', e.target.value);
              }}
              value={form.data.facebook}
            />
            <InputLabel htmlFor="produtoras" value="Facebook" />
            <InputError message={form.errors.facebook} />
          </div>
          <div className="flex flex-row shadow-lg m-1 justify-center items-center">
            <input
              type="checkbox"
              name="onstagram"
              id="onstagram"
              onChange={e => {
                form.setData('onstagram', e.target.value);
              }}
              value={form.data.djs}
            />
            <InputLabel htmlFor="onstagram" value="Instagram" />
            <InputError message={form.errors.onstagram} />
          </div>
          <div className="flex flex-row shadow-lg m-1 justify-center items-center">
            <input
              type="checkbox"
              name="tiktok"
              id="tiktok"
              onChange={e => {
                form.setData('tiktok', e.target.value);
              }}
              value={form.data.tiktok}
            />
            <InputLabel htmlFor="tiktok" value="TikTok" />
            <InputError message={form.errors.tiktok} />
          </div>
          <div className="flex flex-row shadow-lg m-1 justify-center items-center">
            <input
              type="checkbox"
              name="twitter"
              id="twitter"
              onChange={e => {
                form.setData('twitter', e.target.value);
              }}
              value={form.data.twitter}
            />
            <InputLabel htmlFor="twitter" value="Agentes" />
            <InputError message={form.errors.twitter} />
          </div>
        </div>
      </div>
    </>
  );
};

const Orcamento = ({ form, updateOrCreate }) => {
  return (
    <>
      <div className="w-full h-full justify-center flex flex-col items-center">
        <h1 className="text-center text-xl">
          Defina o montante do orçamento que deseja investir para esta acção de
          marketing{' '}
        </h1>
        <div
          action=""
          onSubmit={updateOrCreate}
          className="w-full flex flex-wrap mx-1 md:mx-5  gap-2 text-xl text-black"
        >
          <div className="w-full flex flex-col shadow-lg m-1 ">
            <InputLabel
              htmlFor="budget"
              value="Orçamento para a acção desejada"
            />
            <input
              type="number"
              name="budget"
              id="budget"
              required
              onChange={e => {
                form.setData('budget', e.target.value);
              }}
              value={form.data.budget}
            />
            <InputError message={form.errors.budget} />
          </div>
          <div className="w-full flex flex-col shadow-lg m-1  items-center">
            <InputLabel htmlFor="notes" value="Notas adicionais" />
            <textarea
              name="notes"
              id="notes"
              required
              onChange={e => {
                form.setData('notes', e.target.value);
              }}
              value={form.data.notes}
              className="w-full"
            />
            <InputError message={form.errors.notes} />
          </div>
        </div>
      </div>
    </>
  );
};

const Resumo = ({ form, updateOrCreate }) => {
  const [terms, setTerms] = useState(false);
  return (
    <>
      <div className="w-full flex flex-col">
        <h1 className="text-base">
          A sua avaliação será submetida ao público, acompanhe as respostas e
          feedbacks para melhor engajamento.
        </h1>
        <p className="text-base">Concorde com os termos para prosseguir.</p>
        <div className="w-full flex justify-center items-center m-4 text-xl">
          <InputLabel htmlFor="terms">
            <div className="flex items-center">
              <Checkbox
                name="terms"
                id="terms"
                checked={form.data.terms}
                onChange={e => form.setData('terms', e.currentTarget.checked)}
              />

              <div className="ml-2">
                Concordo com os{' '}
                <a
                  target="_blank"
                  href={route('terms.show')}
                  className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                  Termos de serviços
                </a>{' '}
                e{' '}
                <a
                  target="_blank"
                  href={route('policy.show')}
                  className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                  Politicas de privacidade
                </a>
              </div>
            </div>
            <InputError className="mt-2" message={form.errors.terms} />
          </InputLabel>
        </div>

        <div className="flex justify-center items-center p-5">
          <button
            onClick={updateOrCreate}
            className={`transform-effect p-2 shadow-xl  shadow-white ${
              form.data.terms ? 'flex' : 'hidden'
            } `}
          >
            Concluir
          </button>
        </div>
      </div>
    </>
  );
};
