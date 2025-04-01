import styled from "styled-components";

export const KakaoBtn = styled.button`
  color: #000;
  width: 100%;
  background-color: #fee500;
  height: 50px;
  border-radius: 50px;
  margin-top: 20px;
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
  margin: auto;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;