import styled, { css } from "styled-components";
import { ImageResponse } from "../../../../api/images";
import { colors } from "../../../../styles/colors";
import { InteractiveCard, neonAnimation } from "..";
import { More } from "../../../../assets/svg";


interface CardDetailProps { 
  image: ImageResponse;
  onClose: () => void;
}

export default function CardDetail({ image, onClose }: CardDetailProps) {
  return (
    <Overlay
        key="overlay"
        onClick={onClose}
      >
          
          <Content>
              <div style={{display:"flex", justifyContent:'center', marginBottom:'30px'}}>
                  
              <InteractiveCard image={image} isSelected={true} ></InteractiveCard>

              </div>
              {/* <MoreSection>
                  <More width={13} style={{marginLeft:'auto', cursor:'pointer'}}/>
              </MoreSection> */}
              <ContentsWrapper>
              <div style={{fontSize:'1rem', fontWeight:'600'}}>{image.title}</div>
                  <div style={{color:'#d9d9d9'}}>{image.description}</div>
                  <div style={{color:`${colors.neon200}`, fontSize:'0.7rem', textAlign:'right', marginLeft:'auto'}}>{image.users.nickname}</div>
              </ContentsWrapper>
          </Content>
          
    </Overlay>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80%;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;  /* Added border-radius for rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  /* Added box-shadow for depth effect */
  `

const Overlay = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.8);
backdrop-filter: blur(5px);
z-index: 1000;
display: flex;
justify-content: center;
align-items: center;
`;

const Content = styled.div`
padding: 40px;
/* background: #1a1a1a; */
border-radius: 15px;
overflow-y: auto;
position: relative;
/* border: 1px solid ${colors.neon200}; */

`;

export const MoreSection = styled.div`
    display: flex;
    margin-top: 20px;  /* Added margin-top for spacing */
`;

export const ContentsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;  /* Added justify-content for centering content */
    align-items: center;  /* Added align-items for centering content */
    font-size: 0.8rem;
    gap:5px;;
`