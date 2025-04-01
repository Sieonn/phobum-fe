import styled from "@emotion/styled";
import { colors } from "../../../../styles/colors";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 420px;
    background-color: ${colors.gray400};
    padding: 20px;
    border-radius: 15px;
`;