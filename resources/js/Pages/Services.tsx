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
import { services } from '@/assets/constants';
import Container from '@/Layouts/Container';

function Services() {
  const [solicitar, setSolicitar] = useState(false);
  const [serviceSelected, setServiceSelected] = useState('');

  const onSubmit = () => 1;
  return (
    <AppLayout title="Serviços">
      <Container>
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
                Solicitar Serviço
              </button>
            </div>
          ))}
        </div>
      </Container>

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
            placeholder="Para melhor o servirmos, descreva brevemente a necessidade que precisa ver resolvida."
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
