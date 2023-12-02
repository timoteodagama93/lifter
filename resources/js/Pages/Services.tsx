import AppLayout from '@/Layouts/AppLayout';
import React, { useState } from 'react';
import './services.css';
import Modal from '@/Components/Modal';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import classNames from 'classnames';
import route from 'ziggy-js';
import Swal from 'sweetalert2';
import SecondaryButton from '@/Components/SecondaryButton';

function Services() {
  const services = [
    {
      title: 'Marketing',
      description:
        'Pestamos serviços de consultoria em Marketing, podemos actuar em diferentes etapas de marketing desde o planejamento à execução de campanhas.',
      price: 'Variavel',
    },
    {
      title: 'Publicidade',
      description:
        'Publicitamos diversos serviços e produtos através de diferentes canais, nossa plataforma, medias socais e canais de parceiros.',
      price: 'Variável',
    },
    {
      title: 'Marketing Musical',
      description:
        'A Lifter é uma ferramenta desenhada a pensar principalmente na necessidade de um marketing musical efectivo. Fora isso, planejamos e executamos diversas campanhas de Marketing musical com o objectivo sempre de conectar e aproximar o artista ao seu público. ',
      price: 'Variável',
    },
    {
      title: 'Divulgação Musical',
      description:
        'Realizamos divulgação musical, recorrendo a vários meios e plataformas que permitem a descoberta e o consumo musical pelo usuário',
      price: '15 000,00 KZ',
    },
    {
      title: 'Avaliação Musical',
      description:
        'Submeta a sua músicaa à plataforma para receber feedbacks e avaliações de profissionais e usuários. Sendo bom o trabalho e os convencendo estes farão a divulgação por si partilhando-o em suas redes.',
      price: '5 000,00 KZ',
    },
  ];

  const [solicitar, setSolicitar] = useState(false);
  const [serviceSelected, setServiceSelected] = useState('');

  const onSubmit = () => 1;
  return (
    <AppLayout title="Serviços">
      <div className="services-page">
        <h1 className="text-2xl">Nossos Serviços</h1>
        {services.map((service, index) => (
          <div key={index} className="service text-gray-700">
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <p>Preço: {service.price}</p>
            <button
              onClick={() => {
                setServiceSelected(service.title);
                setSolicitar(true);
              }}
              className="request-button"
            >
              Solicitar orçamento
            </button>
          </div>
        ))}
      </div>
      <Modal isOpen={solicitar} onClose={() => setSolicitar(false)}>
        <SolicitarServico service={serviceSelected} onClose={setSolicitar} />
      </Modal>
    </AppLayout>
  );
}

export default Services;

function SolicitarServico({ service, onClose }) {
  const form = useForm({
    service: service,
    name: '',
    title: 'Mr.',
    contact: '',
    email: '',
    problem: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post('/request-services', {
      onSuccess: () =>
        Swal.fire(
          'Successo na solicitação.',
          'Sua solicitação foi registrada, assim que compreendermos sua necessidade retornaremos o contacto.',
          'success',
        ),
      onFinish: () => form.reset('problem'),
    });
  }

  return (
    <div className="w-full h-full p-5">
      <h1 className="text-2xl w-full text-center text-[#4c88c4] font-bold ">
        Solicitar serviço de {service}{' '}
      </h1>
      <form onSubmit={onSubmit}>
        <div>
          <InputLabel htmlFor="name">Nome completo</InputLabel>
          <TextInput
            id="name"
            type="text"
            className="mt-1 block w-full"
            value={form.data.name}
            onChange={e => form.setData('name', e.currentTarget.value)}
            required
            autoFocus
            autoComplete="name"
          />
          <InputError className="mt-2" message={form.errors.name} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="title">Título</InputLabel>
          <select
            id="title"
            className="mt-1 block w-full"
            value={form.data.title}
            onChange={e => form.setData('title', e.currentTarget.value)}
            required
          >
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Sr.</option>
            <option>Sra.</option>
            <option>Dona.</option>
          </select>
          <InputError className="mt-2" message={form.errors.email} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="contact">
            Contacto telefónico (Indicativo do país, ex: AO - +244 927678173){' '}
          </InputLabel>
          <TextInput
            id="contact"
            type="number"
            className="mt-1 block w-full"
            value={form.data.contact}
            onChange={e => form.setData('contact', e.currentTarget.value)}
            required
            autoComplete="number"
          />
          <InputError className="mt-2" message={form.errors.contact} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="email">Contacto de e-mail</InputLabel>
          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={form.data.email}
            onChange={e => form.setData('email', e.currentTarget.value)}
            required
            autoComplete="email"
          />
          <InputError className="mt-2" message={form.errors.email} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="problem">Descrição da necessidade</InputLabel>
          <textarea
            id="problem"
            className="mt-1 block w-full"
            value={form.data.problem}
            onChange={e => form.setData('problem', e.currentTarget.value)}
            required
            placeholder="Para melhor o servirmos, descreva brevemente que necessidade precisa resolver."
          />
          <InputError className="mt-2" message={form.errors.problem} />
        </div>

        <div className="flex items-center justify-end mt-4">
          <SecondaryButton
            onClick={() => onClose(false)}
            className={classNames('ml-4', { 'opacity-25': form.processing })}
          >
            Cancelar
          </SecondaryButton>
          <PrimaryButton
            className={classNames('ml-4', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Enviar solicitação
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
