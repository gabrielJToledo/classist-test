import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getCommentsFromDB } from '../../store/ducks/films/actions';
import { ToastContainer, toast } from 'react-toastify';

function Header() {
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.userReducer.userInfo)

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = () => {
    const data = { name, comment };
    const headers = { Authorization: `Bearer ${token}` };

    axios.post(`${process.env.REACT_APP_CREATE_COMMENT}`, data, { headers })
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
        setName('')
        setComment('')
        handleCloseModal();
      })
      .catch(err => {
        toast.error(`${err.response.data}`)
      });
  };

  return (
    <>
      <header className="flex justify-center bg-secondary-100 p-3">
        <div className="max-w-5xl w-full flex justify-between">
          <Link to={`/`} className='text-primary-100 no-underline starWarsFont text-2xl'>Netflix Comentários</Link>
          <button className='text-primary-100 hover:text-gray-600 ease-in-out duration-500 starWarsFont text-2xl' onClick={handleShowModal}>
            Adicionar Comentário
          </button>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </header>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Comentário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nome do Filme</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do filme"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Comentário</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Digite seu comentário"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Enviar
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

export default Header;
