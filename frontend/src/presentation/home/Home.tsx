import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useGetCommentsFromDB } from '../../services/comments.service';
import axios from 'axios';
import { getCommentsFromDB } from '../../store/ducks/films/actions';

function Home() {
  const dispatch = useAppDispatch()

  const token = useAppSelector(state => state.userReducer.userInfo)

  useGetCommentsFromDB();

  const commentsFromDB = useAppSelector(state => state.filmReducer.commentsFromDB);

  const handleDeleteComment = (commentId: any) => {
    axios.delete(`${process.env.REACT_APP_DELETE_COMMENT}/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async () => {
        await axios.get(`${process.env.REACT_APP_GET_COMMENTS}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          dispatch(getCommentsFromDB(res.data));
        }).catch((err) => {
          console.log(err)
        })
      })
      .catch((error) => {
        console.error('Erro ao excluir o comentário:', error);
      });
  };

  if (!Array.isArray(commentsFromDB) || commentsFromDB.length === 0) {
    return <div className='h-screen'>
      <div className='border-solid flex justify-center items-center shadow-md shadow-black hover:scale-95 hover:shadow-inherit transition rounded bg-card text-white p-7'>
        <h2 className='text-white text-md'>Nenhum Comentário Feito</h2>
      </div>
    </div>;
  }

  return (
    <div className="max-w-5xl w-full h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {commentsFromDB.map((film: any) => (
          <div key={film.id} className="border-solid shadow-md shadow-black h-48 hover:scale-95 hover:shadow-inherit transition rounded bg-card text-white">
            <div className="bg-headerCard border-b-2 border-primary-100">
              <p className="text-center py-2 text-xl m-0">{film.name}</p>
            </div>
            <div className="p-4">
              <p className="text-slate-300 font-bold">Comentário</p>
              <p className="text-slate-500 flex flex-wrap break-all">{film.comment}</p>

              <div className='flex justify-center'>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-3"
                  onClick={() => handleDeleteComment(film._id)}
                >
                  Deletar Comentário
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;