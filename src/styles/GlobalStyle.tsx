import { createGlobalStyle } from "styled-components";
import Gilroy from "../assets/fonts/Gilroy-ExtraBold.otf";
import PoppinsReg from "../assets/fonts/Poppins-Regular.ttf";
import PoppinsBold from "../assets/fonts/Poppins-SemiBold.ttf";



const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Gilroy';
    src: url(${Gilroy}) format('openType');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsReg}) format('trueType');
    font-weight: 400;
    }

  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsBold}) format('trueType');
    font-weight: 600;
    }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;