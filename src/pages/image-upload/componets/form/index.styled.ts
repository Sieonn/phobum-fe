import styled from "@emotion/styled";
import { colors } from "../../../../styles/colors";
import theme from "../../../../styles/theme";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* width: calc(${theme.size.maxWidth} - 50px); */
    /* width: 100%; */
    background-color: ${colors.gray400};
    padding: 20px;
    border-radius: 15px;
`;