import React from 'react'
import { Col } from '../../components/grid'
import { Margin } from 'styled-components-spacing'
import { H5, Paragraph } from '../../components/Typography'
import { Node } from './elements.js'

const Office = ({ name, telephone, email, streetAddress }) => (
  <Col xs={12} md={3}>
    <Margin bottom={1}>
      <H5 reverse>{name}</H5>
    </Margin>
    <Paragraph>
      <span>
        {streetAddress.map((address, i) => (
          <Node key={address}>{address}</Node>
        ))}
      </span>
      <Node itemProp="telephone">{telephone}</Node>
      {email ? (
        <Node>
          <a href={`mailto:${email}`}>{email}</a>
        </Node>
      ) : null}
    </Paragraph>
  </Col>
)

export default Office
