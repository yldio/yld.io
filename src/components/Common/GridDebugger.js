import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Col, Row, Grid } from '../grid'

const Container = styled(Grid)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.6;
  z-index: ${props => props.theme.zIndexes.gridDebugger};
  pointer-events: none;
`

const Column = styled(Col)`
  &:nth-child(n + 2) {
    display: none;
  }

  ${breakpoint('smallTablet')`
    &:nth-child(n+1) {
      display: block;
    }
  `}
`
const ColumnContent = styled.div`
  width: 100%;
  height: 100vh;
  background: #d8fff7;
  border-left: 1px solid #31ffde;
  border-right: 1px solid #31ffde;
`

const GridDebugger = () => {
  const [showGrid, toggleShowGrid] = useState(false)

  const handleKey = ev => {
    if (ev.key === 'g' && ev.ctrlKey) {
      toggleShowGrid(!showGrid)
    }
  }

  useEffect(
    () => {
      window.addEventListener('keyup', handleKey)

      return () => window.removeEventListener('keyup', handleKey)
    },
    [showGrid]
  )

  return showGrid ? (
    <Container>
      <Row>
        {Array.from(new Array(12)).map((el, idx) => (
          <Column key={idx} width={[1, 1, 1, 1, 1 / 12]} block={false}>
            <ColumnContent />
          </Column>
        ))}
      </Row>
    </Container>
  ) : null
}

export default GridDebugger
