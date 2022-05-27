import styled from 'styled-components/macro';
import { useState, useEffect } from 'react';
import click from '../Images/click.svg';
import pan from '../Images/pan.svg';
import mouse from '../Images/mouse.svg';
import check from '../Images/check.svg';

const Modal = () => {
  const [showModal, setShowModal] = useState(
    window.sessionStorage.getItem('first') ? false : true
  );

  const modalToggle = () => {
    setShowModal(!showModal);
    window.sessionStorage.setItem('first', 'false');
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
    height: 500px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    gap: 2vh;
    font-size: var(--fz-xxl);
  `;

  const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    width: 800px;
    /* align-items: center; */
  `;

  const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 30px;
    width: 180px;
    height: 240px;
    border: var(--dark-purple) 2px solid;
    border-radius: 8px;
    font-size: var(--fz-lg);
  `;

  const LetsGoButton = styled.button`
    background-color: rgb(170, 138, 201);
    color: var(--white);
    font-size: var(--fz-sm);
    font-weight: 700;
    border-radius: var(--border-radius-pill);
    transform: scale(120%);

    &:hover,
    &:focus {
      transform: scale(125%);
    }
  `;

  return (
    <ModalContainer onClick={modalToggle}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <div>
          Welcome to{' '}
          <span
            style={{
              fontFamily: 'Changa One, cursive',
              fontSize: 'var(--fz-xxxl)',
              color: 'rgb(108, 79, 133)',
            }}
          >
            Bopify!
          </span>
        </div>
        <CardContainer>
          <Card>
            <img src={pan} style={{ height: '70px', width: 'auto' }}></img>
            <div>Select a playlist to Bopify</div>
          </Card>
          <Card>
            <img src={click} style={{ height: '70px', width: 'auto' }}></img>
            <div>Click "Bopify this playlist!"</div>
          </Card>
          <Card>
            <img src={check} style={{ height: '70px', width: 'auto' }}></img>
            <div>Check out your new, kid-friendly playlist on Spotify</div>
          </Card>
        </CardContainer>
        <LetsGoButton onClick={modalToggle}>Let's go!</LetsGoButton>
      </Modal>
    </ModalContainer>
  );
};

export default Modal;
