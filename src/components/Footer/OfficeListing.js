import React from 'react'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'

import { Row } from '../../components/grid'
import Locations from './Locations'
import Office from './Office'

const OfficeStyled = styled(Row)`
  overflow: hidden;
`

const OfficeListing = () => (
  <Padding bottom={{ smallPhone: 3.5, tablet: 5 }}>
    <OfficeStyled>
      <Locations>
        {data =>
          data.map(location => (
            <Office
              key={location.node.id}
              {...location.node}
              streetAddress={location.node.streetAddress.streetAddress.split(
                '\n'
              )}
            />
          ))
        }
      </Locations>
    </OfficeStyled>
  </Padding>
)

export default OfficeListing
