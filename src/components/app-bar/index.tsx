import { Wrapper,AppBarStyled } from "./index.styled";
import { Backicon } from "../../assets/svg";
import { Logo, Home, Grid } from "../../assets/svg";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants/routes";
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
            <Home width={45} onClick={() => hadleNaviagte(ROUTE_PATHS.INTRO)}/>
            <Logo width={90} />
            <Grid width={45} onClick={() => hadleNaviagte(ROUTE_PATHS.ALBUM)}/>
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
