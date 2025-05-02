import { Wrapper, AppBarStyled, UserPopup, PopupItem, UserItem, PopupItemWrapper } from "./index.styled";
import { Backicon, Phobum2, Screen2, User } from "../../assets/svg";
import { Logo, Home, Grid } from "../../assets/svg";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants/routes";
import SvgHome2 from "../../assets/svg/Home2";
import { useState, useRef, useEffect } from "react";
import { useStore } from "../../store/store";
import { CommonOverlay } from "../bottom-sheet/index.styled";
import { colors } from "../../styles/colors";

type AppBarProps = {
    type: 'default' | 'back';
    type2?: 'ablum' | 'user';
};

function DefaultAppBar({ type2 = 'ablum' }: Pick<AppBarProps, 'type2'>) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const user = useStore((state) => state.user);

    const handleNaviagte = (path: string) => {
        navigate(path);
    };

    const handleUserClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        // 로그아웃 로직 구현
        setIsOpen(false);
    };

    const handleWithdrawal = () => {
        // 회원탈퇴 로직 구현
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <AppBarStyled>
            <SvgHome2 width={35} onClick={() => handleNaviagte(ROUTE_PATHS.INTRO)} style={{cursor:'pointer'}}/>
            <Phobum2 width={100} />
            {type2 === 'ablum' ? (
                <Screen2 width={35} onClick={() => handleNaviagte(ROUTE_PATHS.ALBUM)} style={{cursor:'pointer'}}/>
            ) : (
                <div ref={popupRef} style={{ position: 'relative' }}>
                    <User width={35} onClick={handleUserClick} style={{cursor:'pointer'}}/>
                    {isOpen && (
                        <CommonOverlay 
                            onClick={() => setIsOpen(false)} 
                            style={{
                                background: 'rgba(0, 0, 0, 0.7)',
                                backdropFilter: 'blur(2px)',
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 1000,
                            }} 
                        />
                    )}
                    <UserPopup $isOpen={isOpen}>
                        <UserItem>
                            <span style={{color:`${colors.neon100}`, fontWeight:'600'}}>
                                {user?.nickname} 
                            </span>
                            님
                        </UserItem>
                        <PopupItemWrapper>
                            <PopupItem onClick={handleLogout}>로그아웃</PopupItem>
                            <PopupItem onClick={handleWithdrawal}>회원탈퇴</PopupItem>
                        </PopupItemWrapper>
                    </UserPopup>
                </div>
            )}
        </AppBarStyled>
    );
}

export function AppBar({ type, type2 = 'ablum' }: AppBarProps) {
    const handleBack = () => {
        window.history.back();
    };
    return (
        <Wrapper>
            {type === 'default' ? <DefaultAppBar type2={type2} /> : <Backicon onClick={handleBack} />}
        </Wrapper>
    );
}

