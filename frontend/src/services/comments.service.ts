import { useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCommentsFromDB } from './../store/ducks/films/actions';

export const useGetCommentsFromDB = () => {
  const token = useAppSelector(state => state.userReducer.userInfo)
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchComments = async () => {
      await axios.get(`${process.env.REACT_APP_GET_COMMENTS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        dispatch(getCommentsFromDB(res.data));
      }).catch((err) => {
        console.log(err)
      })
    };
    fetchComments();
  }, [dispatch, token]);
};
