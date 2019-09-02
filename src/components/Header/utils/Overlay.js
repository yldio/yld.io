import styled from 'styled-components'
import is from 'styled-is'

/**
 * Overlay is used on tablet viewports to enable users to click
 * off the side nav to close it.
 */
const Overlay = styled.div`
  display: none;

  @media screen and (max-width: 959px) {
    z-index: 9;
    background-color: rgba(51, 51, 51, 0.2);
    content: '';
    display: block;
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    transition: opacity ${props => props.theme.animations.fast} ease-out;
    opacity: 0;
    transform: translateX(200%);

    ${is('visible')`
      transform: translateX(0);
      opacity: 1;
    `}
  }
`

export default Overlay
