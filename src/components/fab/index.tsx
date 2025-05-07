// components/FloatingButton.tsx
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SvgPlus from '../../assets/svg/Plus';
import { colors } from '../../styles/colors';
import theme from '../../styles/theme';
const Fab = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${colors.neon100};
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  /* z-index: ${theme.zIndex.FAB}; */ //z-index설정하니까overlay 뚫고 나옴
  cursor: pointer;
  transition: all 0.3s ease;


  &:hover {
    background-color: #3ec47e;
    transform: scale(1.05);
  }
`;

const FloatingButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/make-card');
  };

  return (
      <Fab onClick={handleClick}>
      <SvgPlus width="24" height="24" fillColor='#fff' />
      </Fab>
  );
};

export default FloatingButton;
