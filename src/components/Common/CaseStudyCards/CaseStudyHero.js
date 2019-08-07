import React, { Fragment } from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'

import CaseStudyLayout from './CaseStudyLayout'
import { Col } from '../../grid'
import { SectionTitle, Subtitle } from '../../Typography'
import SeoLinks from '../seoLinks'

const FlexCol = styled(Col)`
  display: flex;
`

const SubSection = ({ heading, items }) => (
  <Padding bottom={0.5}>
    <Subtitle noPaddingBottom>{heading}</Subtitle>
    <Flex alignCenter wrap="true">
      <SeoLinks noPadding items={items} />
    </Flex>
  </Padding>
)

const SpecialitiesAndServices = ({ specialities, services }) => (
  <Padding top={{ smallPhone: 0, tablet: 0.5 }}>
    <SubSection heading="Services provided" items={services} />
    <SubSection heading="Specialities involved" items={specialities} />
  </Padding>
)

const RightHandText = ({ title, specialities, services, as = 'h2' }) => (
  <Fragment>
    <Padding bottom={0.5}>
      <SectionTitle as={as}>{title}</SectionTitle>
    </Padding>
    <FlexCol px={[0, 0, 0, 0, 0, 0, 0]} width={[0, 0, 0, 0, 1, 5 / 6, 5 / 6]}>
      <Padding bottom={1}>
        <SpecialitiesAndServices
          specialities={specialities}
          services={services}
        />
      </Padding>
    </FlexCol>
  </Fragment>
)

const CaseStudyHero = ({ caseStudy, as, scaleImage }) => {
  const { posterImage, title, specialities, services } = caseStudy
  return (
    <CaseStudyLayout
      posterImage={posterImage}
      scaleImage={scaleImage}
      headings={<SectionTitle as={as}>{title}</SectionTitle>}
      textBelowImage={
        <SpecialitiesAndServices
          specialities={specialities}
          services={services}
        />
      }
      rightHandText={
        <RightHandText
          title={title}
          as={as}
          specialities={specialities}
          services={services}
        />
      }
    />
  )
}

export default CaseStudyHero
