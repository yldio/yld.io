import React from 'react'
import { Col } from '../../components/grid'
import { Subtitle, BodyPrimary } from '../../components/Typography'
import { Node } from './elements.js'

const Office = ({ name, telephone, email, streetAddress }) => (
  <Col width={[1, 1, 1, 1 / 2, 1 / 2, 1 / 4]}>
    <Subtitle reverse>{name}</Subtitle>
    <BodyPrimary>
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
    </BodyPrimary>
  </Col>
)

export default Office
