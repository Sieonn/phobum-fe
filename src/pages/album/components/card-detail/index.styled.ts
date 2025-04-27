import styled from "styled-components";
import { More2 } from "../../../../assets/svg";
import { colors } from "../../../../styles/colors";

export const Content = styled.div`
  /* background-color: ${colors.gray400}; */
  border-radius: 20px;
  padding: 15px;
  width: 90%;
  max-width: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CardSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

export const MoreSection = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 10px;
`;

export const ContentsSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
`;

export const Title = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
`;

export const Description = styled.div`
  font-size: 0.7rem;
  color: ${colors.gray100};
  line-height: 1.4;
`;

export const Author = styled.span`
  font-size: 0.65rem;
  color: ${colors.neon200};
  text-align: right;
  margin-top: 4px;
  margin-left: auto;
`;

export const More2Icon = styled(More2)`
  cursor: pointer;
  transition: transform 0.2s ease;
  height: 15px;

  &:hover {
    transform: scale(1.1);
  }
`;