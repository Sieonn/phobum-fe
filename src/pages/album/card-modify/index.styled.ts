import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const ModifyContent = styled.div`
    background-color: ${colors.gray400};
    padding: 20px;
    border-radius: 20px;
    width: 90%;
    max-width: 400px;
  
`;

export const Title = styled.div`
    font-size: 1rem;    
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  color: ${colors.white};
  font-size: 0.9rem;
`;

export const Input = styled.input`
  background: ${colors.gray300};
  border: none;
  padding: 10px;
  border-radius: 8px;
  color: ${colors.white};
`;

export const TextArea = styled.textarea`
  background: ${colors.gray300};
  border: none;
  padding: 10px;
  border-radius: 8px;
  color: ${colors.white};
  min-height: 100px;
  resize: vertical;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
`;

export const CancelButton = styled(Button)`
  background: ${colors.gray300};
  color: ${colors.white};
`;

export const SaveButton = styled(Button)`
  background: ${colors.neon200};
  color: ${colors.black};
`;

// ...existing styles...

export const ImageUploadArea = styled.div`
  width: 100%;
  aspect-ratio: 1;
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
    padding: 8px;
    cursor: pointer;
    transition: opacity 0.2s;
    opacity: 0;
  }

  &:hover label {
    opacity: 1;
  }
`;