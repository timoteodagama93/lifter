import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import User from './User';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from '@inertiajs/react';
import PrimaryButton from './PrimaryButton';
import { BiSend } from 'react-icons/bi';

const CommentsSection = ({ collection, collectionType }) => {
  const [errorLoadingComments, setErrorLoadingComments] = useState(false);

  const [comments, setComments] = useState([]);
  const [loadedComments, setLoadedComments] = useState(true);
  function getComments() {
    const data = new FormData();
    data.append('collection_id', collection.id);
    data.append('collection_type', collectionType);
    axios
      .post('get-comments', data)
      .then(response => {
        setComments(response.data);
        setLoadedComments(false);
      })
      .catch(error => {
        setErrorLoadingComments(true);
      });
  }

  const form = useForm({
    collection_id: collection.id,
    collection_type: collectionType,
    comment: '',
    public: false,
  });

  function submit(e) {
    e.preventDefault();
    form.post('share-comment', {
      onSuccess: response => {
        form.setData('comment', '');
        getComments();
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

  useEffect(getComments, []);

  return (
    <>
      <form
        onSubmit={e => submit(e)}
        className="w-full flex flex-col justify-start text-base items-center p-5"
      >
        <div className="w-full p-2 rounded bg-black text-white flex-col ">
          <h1 className="text-xl">Comentário</h1>
          <label className="mx-5" htmlFor="comment">
            Comente ou inicie uma discussão!.
          </label>
          <progress>
            <> {form.progress}</>{' '}
          </progress>
          <div className="w-full flex flex-row">
            <textarea
              className="text-black w-full"
              value={form.data.comment}
              onChange={e => form.setData('comment', e.target.value)}
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
          {comments?.map(comment => (
            <Comment key={comment.id} {...comment} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CommentsSection;
