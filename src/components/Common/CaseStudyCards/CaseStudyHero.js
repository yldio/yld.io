import React from 'react'
import Flex from 'styled-flex-component'
import { Margin } from 'styled-components-spacing'
import CaseStudyLayout from './CaseStudyLayout'
import { H5 } from '../../Typography'
import FixedSizeHeading from './FixedSizeHeading'
import SeoLinks from '../seoLinks'

const SubSection = ({ heading, items }) => (
  <Flex column>
    <H5 noMargin noWrap>
      {heading}
    </H5>
    <Flex alignCenter wrap>
      <SeoLinks noMargin items={items} />
    </Flex>
  </Flex>
)

const SpecialitiesAndServices = ({ specialities, services }) => (
  <Flex>
    {specialities && (
      <Margin right={2}>
        <SubSection heading="Technology used" items={specialities} />
      </Margin>
    )}
    <SubSection heading="Services provided" items={services} />
  </Flex>
)

const CaseStudyHero = ({ caseStudy }) => {
  const { posterImage, title, specialities, services } = caseStudy
  return (
    <CaseStudyLayout
      posterImage={posterImage}
      headings={<FixedSizeHeading>{title}</FixedSizeHeading>}
      mainText={
        <SpecialitiesAndServices
          specialities={specialities}
          services={services}
        />
      }
    />
  )
}

export default CaseStudyHero
