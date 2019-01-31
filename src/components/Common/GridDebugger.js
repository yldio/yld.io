import React from 'react'
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
  z-index: 999;
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
  border: 1px solid #31ffde;
`

const GridDebugger = ({ page }) => (
  <Container>
    <Row>
      {Array.from(new Array(12)).map((el, idx) => (
        <Column key={idx} width={[1, 1, 1, 1, 1 / 12]}>
          <ColumnContent />
        </Column>
      ))}
    </Row>
  </Container>
)

export default GridDebugger
