import styled from 'styled-components/macro';

const StyledGrid = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 5vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: var(--spacing-sm);

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: var(--spacing-lg);
  }

  .grid__item {
    background-color: rgb(125, 70, 173);
    border-radius: var(--border-radius-subtle);
    transition: background-color 0.3s ease;
    cursor: default;

    &:hover,
    &:focus {
      background-color: rgb(56, 39, 72);
      transform: scale(101%);

      img {
        box-shadow: 0 8px 24px rgb(0 0 0 / 50%);
      }
    }

    a {
      display: block;
      width: 100%;
      height: 100%;

      &:hover,
      &:focus {
        text-decoration: none;
      }
    }
  }

  .grid__item__inner {
    padding: var(--spacing-sm);

    @media (min-width: 768px) {
      padding: var(--spacing-md);
    }
  }

  .grid__item__img {
    position: relative;
    padding-top: 100%;
    margin: 0 auto var(--spacing-lg);

    img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: var(--dark-grey);
      border-radius: ${(props) => (props.type === 'artist' ? '50%' : '2px')};
    }
  }

  .grid__item__name {
    color: var(--light-purple);
    margin: 0 0 var(--spacing-xxs);
    font-size: var(--fz-md);
    letter-spacing: normal;
  }

  .grid__item__label {
    font-size: var(--fz-sm);
    color: var(--dark-purple);
  }
`;

export default StyledGrid;
