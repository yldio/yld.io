import React from 'react'
// eslint-disable-next-line
import { withComponent } from 'styled-components'
import H1 from './h1'

// this is to be able to pass the className prop down to add styles on later
const H2 = props => React.createElement(H1.withComponent('h2'), props)

export default H2
