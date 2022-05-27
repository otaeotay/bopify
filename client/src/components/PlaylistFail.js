import styled from 'styled-components/macro';
import { useState, useEffect } from 'react';

const PlaylistFail = (props) => {
  const [showModal, setShowModal] = useState(true);

  const modalToggle = () => {
    props.setSuccess(false);
    setShowModal(!showModal);
  };

  const ModalContainer = styled.div`
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    z-index: 1;
    display: ${showModal ? 'flex' : 'none'};
  `;

  const Modal = styled.div`
    width: 800px;
    height: 400px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2vh;
    font-size: var(--fz-xxl);
  `;

  return (
    <ModalContainer onClick={modalToggle}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            fontFamily: 'Changa One, cursive',
            fontSize: 'var(--fz-xxxl)',
            color: 'rgb(108, 79, 133)',
          }}
        >
          Boo
        </div>
        <div>Something went wrong..</div>
        <div>Please try refreshing your page.</div>
        <div style={{ fontSize: 12 }}>
          Note: Do not try to create a Bopified playlist with over 100 songs
        </div>
      </Modal>
    </ModalContainer>
  );
};

export default PlaylistFail;
