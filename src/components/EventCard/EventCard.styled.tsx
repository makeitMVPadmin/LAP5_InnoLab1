import styled from "styled-components";


interface BackgroundProps {
  image: string;
}


export const Container = styled.div`
  width: 20.3125rem;
  height: 34.5625rem;
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  position: relative;
  padding: 1.0625rem .8125rem;
  height: 100%;
`

export const CardImage = styled.div<BackgroundProps>`
  height: 18.4375rem;
  border: 3px solid #000;
  border-radius: 24.2px;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  width: 20.3125rem;
`;

export const TopTagsContainer = styled.div`
  position: absolute;
  display: flex;
  gap: .5rem;
  flex-wrap: wrap;
  top:0.75rem;
  right:0.625rem;
`;

export const BottomTagsContainer = styled.div`
  position: absolute;
  bottom: 17px; 
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  width: 92%;
`;

export const Tag = styled.span`
  display: flex;
  background: #fff;
  color: #000;
  padding: 4px 8px;
  font-family: 'Gilroy';
  height:1.6169rem;
  border-radius: 83.44px;
  border:1.25px solid #000;
  justify-content: center;
  align-items: center;
`;

export const FavIcon = styled.div`
  border: 1.25px solid #000;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.125rem;
  gap: 1rem;
  justify-content: space-between;
  flex: 1;
  font-family: "Poppins";
`

export const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

    & h3 {
    font-size: 1.5625rem;
    font-weight: 700;
    overflow: hidden;        
    text-overflow: ellipsis; 
  }

  & p {
    font-size: 1.125rem;
    font-weight: 600;
  }
`

export const Button = styled.button`
  background-color: #0099FF;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12.625rem;
  height: 3.9375rem;
  border: 3px solid black;
  border-radius: 0.625rem;
  font-size: 1.6875rem;
  font-family: Gilroy;
  font-weight: 700;
  border-width: 3px 5px 5px 3px;
`

export const ThemesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  font-size: 1rem;
  line-height: 1
`;