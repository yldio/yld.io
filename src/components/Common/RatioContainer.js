import styled from 'styled-components'

const RatioContainer = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  padding-bottom: ${props => (props.height / props.width) * 100}%;
  overflow: hidden;
`

export default RatioContainer
