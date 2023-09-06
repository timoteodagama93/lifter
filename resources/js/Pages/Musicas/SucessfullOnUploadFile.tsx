import AppLayout from '@/Layouts/AppLayout';
import { useForm } from '@inertiajs/react';
import React from 'react';

function SucessfullOnUploadFile({ data }) {

  return <AppLayout title='Upload done'>{data} </AppLayout>;
}

export default SucessfullOnUploadFile;
