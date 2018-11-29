import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

const Box = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: #fffaf1;
  z-index: 100;
  border-top: 1px solid #ffcd7c;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 24px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);

  ${breakpoint('tablet')`
    flex-direction: row;
    width: 95%;
    bottom: 24px;
    left: 0%;
    right: 0%;
    margin: 0 auto;
    border-radius: 6px;
    border: 1px solid #ffcd7c;
    padding: 18px 24px;
  `}
`

const Text = styled.p`
  font-size: 17px;
  margin-bottom: 30px;
  ${breakpoint('tablet')`
        display: inline;
        margin: 0;
    `}
`

const Button = styled.button`
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.text};
  font-weight: bold;
  text-align: center;
  font-size: 17px;
  height: 60px;
  width: 100%;
  ${breakpoint('tablet')`
        margin-left: auto;
        width: 150px;
    `};
`

const Cookie = ({ onClick }) => (
  <Box>
    <Text>
      By continuing to use our site you agree to our use of cookies
      {/* By continuing to use our site you agree to the use of cookies in
      accordance with our Cookie and Privacy policies. */}
    </Text>
    <Button onClick={onClick}>I agree</Button>
  </Box>
)

export default Cookie
