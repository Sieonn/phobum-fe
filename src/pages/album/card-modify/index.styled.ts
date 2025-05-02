import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const ModifyContent = styled.div`
    background-color: ${colors.gray400};
    padding: 30px 20px;
    border-radius: 20px;
    width: 90%;
    max-height: 90%;
    max-width: 400px;
  
`;


export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
`;

export const CancelButton = styled.button`
  background: ${colors.gray300};
  color: ${colors.white};
  border-radius: 30px;
  flex: 1;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${colors.gray200};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// ...existing styles...

export const ImageUploadArea = styled.div`
  width: 60%;
  aspect-ratio: 0.9;
  margin: auto;
  margin-bottom: 20px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  input[type="file"] {
    display: none;
  }

  label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    text-align: center;
    padding: 15px;
    cursor: pointer;
    transition: opacity 0.2s;
    opacity: 1;
    font-size: 0.9rem;
  }

  &:hover label {
    /* opacity: 1; */
    color: ${colors.neon100};
  }
`;

export const AuthorandDateStyle = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.7rem;
  margin-left: auto;
  gap:5px
`
