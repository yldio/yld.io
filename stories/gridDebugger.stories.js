import React from 'react'
import styled from 'styled-components'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import { DisplayTitle } from '../src/components/Typography'
import GridDebugger from '../src/components/Common/GridDebugger'

addDecorator(Theme)

const Block = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

storiesOf('Grid Debugger', module).add('Usage', () => {
  return (
    <Block>
      <GridDebugger />
      <DisplayTitle>Press Ctrl + G to toggle the Grid Debugger</DisplayTitle>
    </Block>
  )
})
