import { createGlobalStyle } from 'styled-components'

import img from './images/img.jpg'

import './common/bootstrap.min.css'
import 'rodal/lib/rodal.css'

export default createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    display: flex;
    min-height: 100vh;
    width: 100vw;
    overflow-x: hidden;
  }
  
  #root {
    flex-basis: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .page {
    flex-basis: 100%;
  }
  
  .page.home {
    background-image: url(${img});
    background-size: 100% 60vmax;
    background-position: center top;
    background-repeat: no-repeat;
  }
  
  .page.E404 {
    display: flex;
  }
  
  .page.event, .page.tips, .page.admin, .page.about-us, .page.contact-us {
    display: flex;
    flex-direction: column;
  }
  
  .rdw-image-modal {
    left: auto !important;
    right: 5px;
  }
  
  .rdw-image-modal-upload-option-label {
    overflow: hidden !important;
  }
  `
