import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { updateUser } from '../../actions/user';
import Spinner from '../Spinner';
import { changeProject } from '../../actions/project';

const Container = styled.div`
  padding: 30px;
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

const ModalCreateProject = ({ handleClose }) => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Modal show={true} onHide={() => null} size={'account'}>
      <Container>
        <h6>Créer un project</h6>

        <div style={{ marginBottom: '20px' }}>
          <label>Nom du project</label>
          <input placeholder="3shop" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <label>Description</label>
        <textarea
          placeholder={
            '3shop aide les entreprises à fidéliser leurs clients grâce à une solution de e-commerce intégré sur leur site en quelques minutes'
          }
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <ButtonsContainer>
          {user?.projects?.length && (
            <ButtonCancel onClick={handleClose}>
              <p>Retour</p>
            </ButtonCancel>
          )}
          <button
            onClick={() => {
              setIsLoading(true);
              dispatch(
                updateUser({
                  projects: [...(user?.projects || []), { name, description }],
                }),
              ).then((ret) => {
                if (ret?.user) setIsLoading(false);
                if (ret.user?.projects?.find((p) => p.name === name)) {
                  dispatch(changeProject(name));
                  handleClose();
                }
              });
            }}
            disabled={!name || !description}
          >
            {isLoading && <Spinner />}
            Créer le projet
          </button>
        </ButtonsContainer>
      </Container>
    </Modal>
  );
};

export default ModalCreateProject;
