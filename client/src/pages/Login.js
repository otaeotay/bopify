import styled from 'styled-components/macro';
import github from '../Images/github.svg';

const StyledLoginContainer = styled.main`
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 5vh;
`;

const StyledLoginButton = styled.a`
  display: inline-block;
  background-color: rgb(161, 116, 201);
  /* background-color: var(--green); */
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    transform: scale(105%);
  }
`;

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 1.5vh;
  padding: 4vh 0;
`;

const StyledLogo = styled.a`
  position: fixed;
  bottom: 0;
  right: max(2vw, 2vh);
  height: 9.5vh;
  display: flex;
  align-items: center;
`;

const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://bopify.herokuapp.com/login';

const Login = () => (
  <StyledLoginContainer>
    <div>
      <div
        style={{
          fontFamily: 'Changa One, cursive',
          fontSize: 'var(--fz-xxxl)',
          color: 'rgb(108, 79, 133)',
        }}
      >
        BOPIFY!
      </div>
      <div style={{ fontSize: 'var(--fz-xxl)' }}>
        Convert any playlist with your favorite songs to something your kids can
        listen to
      </div>
      <div style={{ fontSize: 'var(--fz-sm)' }}>
        A project by Tae Hwan Lee - Not affiliated with Kidz Bop Kids
      </div>
    </div>

    <StyledLoginButton href={LOGIN_URI}>Log in to Spotify</StyledLoginButton>

    <StyledFooter className="footer">
      <div>TAE HWAN LEE ©2022</div>
      <StyledLogo
        href="https://github.com/otaeotay"
        target="_blank"
        rel="noopener noreferrer"
        id="logo"
      >
        <img
          src={github}
          alt="Github"
          id="github"
          style={{ height: '5vh' }}
        ></img>
      </StyledLogo>
    </StyledFooter>
  </StyledLoginContainer>
);

export default Login;
