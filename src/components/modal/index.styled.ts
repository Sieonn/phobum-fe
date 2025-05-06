import styled from "styled-components";
import { colors } from "../../styles/colors";

export const ModalContainer = styled.div`
    width: 50%;
    margin: auto;
    background-color: ${colors.gray400};
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
`;