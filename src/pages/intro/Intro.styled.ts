import styled from "styled-components";
import { colors } from "../../styles/colors";

export const KakaoBtn = styled.button`
  color: #000;
  width: 100%;
  background-color: #fee500;
  height: 50px;
  border-radius: 50px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.2s;
  &:active {
    background-color: color-mix(in srgb, #fee500, #000 30%);
  }
`;

export const PicktureWrapper = styled.div`
  height: auto;
  justify-content: baseline;
  animation: float 2s ease-in-out infinite;
  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px); //위로 10px
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 0 25px;
`;

export const TextStyled = styled.div`
  font-size: 0.75rem;
  font-family: 'Galmuri11';
`;
export const TextStyled2 = styled(TextStyled)`
  &:hover{
    color: ${colors.neon100};
  }
`;