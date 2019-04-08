import React from 'react'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'
import { Col } from '../../components/grid'
import { Subtitle, BodyPrimary } from '../../components/Typography'

const StyledBodyPrimary = styled(BodyPrimary).attrs({ noPadding: true })`
  color: ${props => props.theme.colors.white};
  opacity: 0.5;
`

const Office = ({ name, telephone, email, streetAddress }) => (
  <Col width={[1, 1, 1, 1 / 2, 1 / 2, 1 / 4]}>
    <Padding bottom={3}>
      <Subtitle reverse>{name}</Subtitle>
      <Padding top={1} bottom={1}>
        {streetAddress.map((address, i) => (
          <StyledBodyPrimary key={address}>{address}</StyledBodyPrimary>
        ))}
        <StyledBodyPrimary itemProp="telephone">{telephone}</StyledBodyPrimary>
        {email ? (
          <StyledBodyPrimary>
            <a href={`mailto:${email}`}>{email}</a>
          </StyledBodyPrimary>
        ) : null}
      </Padding>
    </Padding>
  </Col>
)

export default Office
