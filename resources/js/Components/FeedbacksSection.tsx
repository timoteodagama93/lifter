import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import User from './User';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from '@inertiajs/react';
import PrimaryButton from './PrimaryButton';
import { BiSend } from 'react-icons/bi';

const FeedbacksSection = ({ collection, collectionType }) => {
  const [errorLoadingComments, setErrorLoadingFeedbacks] = useState(false);

  const [feedbacks, setFeedbacks] = useState([]);
  const [loadedComments, setLoadedFeedbacks] = useState(true);

  function getfeedbacks() {
    const data = new FormData();
    data.append('collection_id', collection.id);
    data.append('collection_type', collectionType);
    axios
      .post('get-feedbacks', data)
      .then(response => {
        setFeedbacks(response.data);
        setLoadedFeedbacks(false);
      })
      .catch(error => {
        setErrorLoadingFeedbacks(true);
      });
  }

  const form = useForm({
    collection_id: collection.id,
    collection_type: collectionType,
    feedback: '',
    public: false,
  });

  function submit(e) {
    e.preventDefault();
    form.post('share-feedback', {
      onSuccess: response => {
        form.setData('feedback', '');
        getfeedbacks();
      },
      onError: error => {
        Swal.fire({
          title: 'Erro',
          text: 'Alguma coisa correu mal, reenvie o seu feedback, nós os amantes de músicas agradecemos sua paciência. Se persistir, relate o problema.',
          icon: 'error',
        });
      },
    });
  }

  useEffect(getfeedbacks, []);

  return (
    <>
      <form
        onSubmit={e => submit(e)}
        className="w-full flex flex-col justify-start text-base items-center p-5"
        encType="multipart/form-data"
      >
        <div className="w-full p-2 rounded bg-black text-white flex-col ">
          <h1 className="text-xl">Deixe seu feedback</h1>
          <label className="mx-5" htmlFor="comment">
            Comente ou inicie uma discussão!.
          </label>
          <progress>
            <> {form.progress}</>{' '}
          </progress>
          <div className="w-full flex flex-row">
            <textarea
              className="text-black w-full"
              value={form.data.feedback}
              onChange={e => form.setData('feedback', e.target.value)}
              rows={2}
              required
              disabled={form.processing}
            ></textarea>
            <PrimaryButton disabled={form.processing}>
              <BiSend className="w-10 h-10" />
            </PrimaryButton>
          </div>
        </div>
      </form>
      <div className="comments-section">
        <div className="comments">
          {feedbacks?.map(comment => (
            <Comment key={comment.id} comment={comment?.message} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FeedbacksSection;
