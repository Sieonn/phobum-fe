import { Wrapper,AppBarStyled } from "./index.styled";
import { Backicon, Phobum2, Screen2 } from "../../assets/svg";
import { Logo, Home, Grid } from "../../assets/svg";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants/routes";
import SvgHome2 from "../../assets/svg/Home2";
type AppBarProps = {
    type: 'default' | 'back';
};

function DefaultAppBar(){
    const navigate = useNavigate()

    const hadleNaviagte=(path: string)=>{
        navigate(path);
    } 
    return(
        <AppBarStyled>
            <SvgHome2 width={35} onClick={() => hadleNaviagte(ROUTE_PATHS.INTRO)}/>
            <Phobum2 width={100} />
            <Screen2 width={35} onClick={() => hadleNaviagte(ROUTE_PATHS.ALBUM)}/>
    </AppBarStyled>
    )
}

export function AppBar({ type }: AppBarProps) {
    const handleBack = () =>{
        window.history.back();
    }
    return (
        <Wrapper>
            {type === 'back' ? <Backicon width={12} onClick={handleBack} /> : <DefaultAppBar/>}
        </Wrapper>
    );
}
