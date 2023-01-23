import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { imagesLinks } from '../../utils';
import { updateUser } from '../../actions/user';
import Spinner from '../Spinner';

const Container = styled.div`
  padding: 30px;
`;

const Picture = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 20px;
`;

const ButtonCancel = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 20px;

  p {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ModalAccount = ({ handleClose }) => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({});

  useEffect(() => {
    if (user) {
      setData({
        ...data,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }
  }, [user]);

  return (
    <Modal show={true} onHide={() => null} size={'account'}>
      <Container>
        <h6>Mon compte</h6>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Picture src={user?.picture_url || imagesLinks.gifs.avatar} alt={user?.first_name} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '48%' }}>
            <label>Prénom</label>
            <input
              placeholder="Jean"
              value={data.first_name}
              onChange={(e) => setData({ ...data, first_name: e.target.value })}
            />
          </div>
          <div style={{ width: '48%' }}>
            <label>Nom</label>
            <input
              placeholder="Dujardin"
              value={data.last_name}
              onChange={(e) => setData({ ...data, last_name: e.target.value })}
            />
          </div>
        </div>

        <input value={user?.email} disabled />

        <ButtonsContainer>
          <ButtonCancel onClick={handleClose}>
            <p>Retour</p>
          </ButtonCancel>
          <button
            onClick={() => {
              setIsLoading(true);
              dispatch(
                updateUser({ first_name: data?.first_name, last_name: data?.last_name }),
              ).then(() => setIsLoading(false));
            }}
            style={{ width: 'fit-content' }}
            disabled={data?.first_name === user?.first_name && data?.last_name === user?.last_name}
          >
            {isLoading && <Spinner />}
            Modifier
          </button>
        </ButtonsContainer>
      </Container>
    </Modal>
  );
};

export default ModalAccount;
