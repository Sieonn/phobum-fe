import { Button, ButtonStatus } from "../button";
import { ButtonWrapper } from "./index.styled";

interface GnbProps { 
    onClick?: () => void;
    name?: string;
    status?: ButtonStatus;
}
export default function Gnb({ onClick,name, status='default'}: GnbProps) { 
    return (
        <ButtonWrapper>
            <Button fullWidth onClick={onClick} status={status}>{name}</Button>
        </ButtonWrapper>
    )
}