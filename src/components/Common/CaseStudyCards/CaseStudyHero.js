import React, { Fragment } from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'
import { Col } from '../../grid'
import CaseStudyLayout from './CaseStudyLayout'
import { SectionTitleH2, SubtitleH3 } from '../../Typography'
import SeoLinks from '../seoLinks'

const FlexCol = styled(Col)`
  display: flex;
`

const SubSection = ({ heading, items }) => (
  <Padding bottom={0.5}>
    <SubtitleH3>{heading}</SubtitleH3>
    <Flex alignCenter wrap>
      <SeoLinks noPadding items={items} />
    </Flex>
  </Padding>
)

const SpecialitiesAndServices = ({ specialities, services }) => (
  <Padding top={{ smallPhone: 0, tablet: 0.5 }}>
    {specialities ? (
      <SubSection heading="Technology used" items={specialities} />
    ) : null}
    <SubSection heading="Services provided" items={services} />
  </Padding>
)

const RightHandText = ({ title, specialities, services }) => (
  <Fragment>
    <Padding bottom={0.5}>
      <SectionTitleH2>{title}</SectionTitleH2>
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

const CaseStudyHero = ({ caseStudy }) => {
  const { posterImage, title, specialities, services } = caseStudy
  return (
    <CaseStudyLayout
      posterImage={posterImage}
      headings={<SectionTitleH2>{title}</SectionTitleH2>}
      textBelowImage={
        <SpecialitiesAndServices
          specialities={specialities}
          services={services}
        />
      }
      rightHandText={
        <RightHandText
          title={title}
          specialities={specialities}
          services={services}
        />
      }
    />
  )
}

export default CaseStudyHero
