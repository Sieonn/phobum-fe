import styled from "@emotion/styled";
import { colors } from "../../styles/colors";
import { Plus } from "../../assets/svg";
import theme from "../../styles/theme";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 25px 50px 25px;
    align-items: center;
    width: 100%;
    gap: 15px;
    overflow-y: scroll;
    z-index: 100;
`;

export const UploadContainer = styled.div`
    background-color: ${colors.gray400};
    border-radius: 15px;
    width: 50%;
    margin: 0 auto;
    height: 40dvh;
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
    width: 80%;
    height: 85%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;  // 추가: 이미지가 컨테이너를 벗어나지 않도록
`;

export const PlusIcon  = styled(Plus)`
    transition:  transform 0.3s ease;
    cursor: pointer;
    &:hover{
        transform: scale(1.04);
    }
`