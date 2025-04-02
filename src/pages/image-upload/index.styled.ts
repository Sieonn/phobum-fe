import styled from "@emotion/styled";
import { colors } from "../../styles/colors";
import { Plus } from "../../assets/svg";
import theme from "../../styles/theme";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 20px;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 15px;
`;

export const UploadContainer = styled.div`
    background-color: ${colors.gray400};
    border-radius: 15px;
    width: 60%;
    /* width: 280px; */
    margin: 0 auto;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    position: relative;
`;

export const ImgaeUpload = styled.div`  
    position: absolute;
    background-color: ${colors.gray300};
    z-index: 10;
    width: 80%;
    height: 80%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

`;

export const PlusIcon  = styled(Plus)`
    transition:  transform 0.3s ease;

    &:hover{
        transform: scale(1.04);
    }
`