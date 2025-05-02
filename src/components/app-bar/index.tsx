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
import axios from "axios";
import { tokenStorage } from "../../utils/tokenStorage";

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

    const handleDelete = async () => {
        // 로그아웃 로직 구현
        const token = sessionStorage.getItem('refreshToken'); // 로컬 스토리지에서 토큰 가져오기
        if (!token) {
          alert('로그인이 필요합니다!');
          return;
        }
        setIsOpen(false);
        try {
          // 탈퇴 요청을 보낼 때 Authorization 헤더에 Bearer 토큰 추가
          const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
    
          if (response.status === 200) {
            // 탈퇴 성공 시 로컬 스토리지에서 토큰 삭제하고, 로그인 페이지로 리다이렉트
            sessionStorage.removeItem('refreshToken');
            alert('회원 탈퇴가 완료되었습니다.');
          }
        } catch (error) {
          console.error('회원 탈퇴 오류:', error);
          alert('회원 탈퇴 중 오류가 발생했습니다.');
        }
      };
      const handleLogout = () => {
        tokenStorage.clearTokens();
        alert('로그아웃 되었습니다.');
        navigate(ROUTE_PATHS.INTRO);
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
                            <PopupItem onClick={handleDelete}>회원탈퇴</PopupItem>
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
            {type === 'default' ? <DefaultAppBar type2={type2} /> : <Backicon width={13} style={{cursor:'pointer'}} onClick={handleBack} />}
        </Wrapper>
    );
}

