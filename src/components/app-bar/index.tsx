import { Wrapper, AppBarStyled, UserPopup, PopupItem, UserItem, PopupItemWrapper } from "./index.styled";
import { Backicon, Phobum2, Screen2, User } from "../../assets/svg";
import SvgHome2 from "../../assets/svg/Home2";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants/routes";
import { useState, useRef, useEffect } from "react";
import { useStore } from "../../store/store";
import { CommonOverlay } from "../bottom-sheet/index.styled";
import { colors } from "../../styles/colors";
import axios from "axios";
import { tokenStorage } from "../../utils/tokenStorage";

type AppBarProps = {
    type: 'default' | 'back';
    type2?: 'album' | 'user';
    onBack?: () => void;
};

export function AppBar({ type, type2 = 'album', onBack }: AppBarProps) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const user = useStore((state) => state.user);

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const handleBack = () => {
        onBack ? onBack() : window.history.back();
    };

    const handleUserClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        tokenStorage.clearTokens();
        alert('로그아웃 되었습니다.');
        navigate(ROUTE_PATHS.INTRO);
    };

    const handleDelete = async () => {
        const token = sessionStorage.getItem('refreshToken');
        if (!token) {
            alert('로그인이 필요합니다!');
            return;
        }
        setIsOpen(false);
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                sessionStorage.removeItem('refreshToken');
                alert('회원 탈퇴가 완료되었습니다.');
                navigate(ROUTE_PATHS.INTRO);
            }
        } catch (error) {
            console.error('회원 탈퇴 오류:', error);
            alert('회원 탈퇴 중 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <Wrapper>
            <AppBarStyled>
                {type === 'default' ? (
                    <>
                        <SvgHome2 width={35} onClick={() => handleNavigate(ROUTE_PATHS.INTRO)} style={{ cursor: 'pointer' }} />
                        <Phobum2 width={100} />
                        {type2 === 'album' ? (
                            <Screen2 width={35} onClick={() => handleNavigate(ROUTE_PATHS.ALBUM)} style={{ cursor: 'pointer' }} />
                        ) : (
                            <div ref={popupRef} style={{ position: 'relative' }}>
                                <User width={35} onClick={handleUserClick} style={{ cursor: 'pointer' }} />
                                {isOpen && (
                                    <>
                                        <CommonOverlay
                                            onClick={() => setIsOpen(false)}
                                        />
                                        <UserPopup $isOpen={isOpen}>
                                            <UserItem>
                                                <span style={{ color: colors.neon100, fontWeight: '600' }}>
                                                    {user?.nickname}
                                                </span>{' '}
                                                님
                                            </UserItem>
                                            <PopupItemWrapper>
                                                <PopupItem onClick={handleLogout}>로그아웃</PopupItem>
                                                <PopupItem onClick={handleDelete}>회원탈퇴</PopupItem>
                                            </PopupItemWrapper>
                                        </UserPopup>
                                    </>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <Backicon width={13} style={{ cursor: 'pointer' }} onClick={handleBack} />
                )}
            </AppBarStyled>
        </Wrapper>
    );
}
