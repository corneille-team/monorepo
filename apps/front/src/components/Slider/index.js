import React from 'react';
import styled from 'styled-components';
import millify from 'millify';

import theme from '../../styles/theme';

const Header = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(-100%);
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Range = styled.input`
  border: none;
  width: 100%;
  border-radius: 4px;
  -webkit-appearance: none; /* Supprime les styles par défaut du navigateur */
  padding: 0 10px;
  height: fit-content;

  &::-webkit-slider-runnable-track {
    width: 100%; /* Remplit tout l'espace disponible */
    height: 4px; /* Hauteur de la barre de progression */
    cursor: pointer; /* Curseur en forme de main */
    background: ${theme.colors.grayLight}; /* Couleur de la barre de progression bleue */
    border-radius: 4px; /* Bordure arrondie */
  }

  &::-webkit-slider-thumb {
    top: 50%;
    transform: translateY(-35%);
    -webkit-appearance: none; /* Supprime les styles par défaut du navigateur */
    appearance: none; /* Supprime les styles par défaut du navigateur */
    width: 19px; /* Largeur de la poignée */
    height: 16px; /* Hauteur de la poignée */
    border-radius: 4px; /* La poignée est un cercle */
    background: ${theme.colors.blueDeep}; /* Couleur de la poignée bleue */
    cursor: pointer; /* Curseur en forme de main */
  }

  &:hover {
    border: none;
  }

  &:focus {
    border: none;
  }
`;

const MarksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 17px 0 17px;
`;

const Mark = styled.div`
  width: 4px;
  height: 10px;
  border-radius: 12px;
  background-color: ${(props) => (props.selected ? theme.colors.blueDeep : theme.colors.grayLight)};
`;

const StyledSlider = ({ min, max, value, setValue, markers }) => {
  return (
    <div style={{ position: 'relative' }}>
      <Header>
        <span>{millify(min)}</span>
        <span>{millify(max)}</span>
      </Header>
      <Range
        type={'range'}
        value={value}
        min={0}
        max={markers?.length - 1}
        onChange={(e) => setValue(e.target.value)}
      />
      <MarksContainer>
        {markers?.map((m, index) => (
          <Mark key={index} selected={parseInt(value) === index} />
        ))}
      </MarksContainer>
    </div>
  );
};

export default StyledSlider;
