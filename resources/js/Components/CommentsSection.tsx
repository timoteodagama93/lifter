import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import User from './User';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from '@inertiajs/react';
import PrimaryButton from './PrimaryButton';
import { BiSend } from 'react-icons/bi';
import { BsSend } from 'react-icons/bs';

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

    const data = new FormData();
    data.append('collection_id', collection.id);
    data.append('collection_type', collectionType);
    data.append('comment', form.data.comment);
    axios
      .post('share-comment', data)
      .then(response => {
        form.setData('comment', '');
        getComments();
      })
      .catch(error => {
        Swal.fire({
          title: 'Erro',
          text: 'Alguma coisa correu mal, reenvie o seu feedback, nós os amantes de músicas agradecemos sua paciência. Se persistir, relate o problema.',
          icon: 'error',
        });
        setErrorLoadingComments(true);
      });
  }

  useEffect(getComments, [collection]);

  return (
    <>
      <form
        onSubmit={e => submit(e)}
        className="w-full flex flex-col justify-start text-base items-center p-5"
        encType="multipart/form-data"
      >
        <div className="w-full p-2 rounded shadow shadow-black dark:shadow-white dark:bg-[#191919] dark:text-gray-500 flex-col ">
          <div className="w-full flex flex-row">
            <textarea
              className="text-black dark:text-gray-600 w-full rounded "
              value={form.data.comment}
              onChange={e => form.setData('comment', e.target.value)}
              rows={2}
              required
              placeholder="Comentar"
              disabled={form.processing}
            ></textarea>
            <button disabled={form.processing} className=''  >
              <BsSend className="w-10 h-10 " />
            </button>
          </div>
        </div>
      </form>
      <div className="comments-section">
        <div className="comments">
          {comments?.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CommentsSection;
