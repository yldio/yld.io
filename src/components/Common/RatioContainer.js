import styled from 'styled-components';

/**
 *
 * This is a technique for preventing image reflow:
 * Read more about it here: https://www.voorhoede.nl/en/blog/say-no-to-image-reflow/
 *
 */
const RatioContainer = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  padding-bottom: ${props => (props.height / props.width) * 100}%;
  overflow: hidden;
`;

export default RatioContainer;
