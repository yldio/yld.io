import React, { useContext } from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

import LogoLink from './DesktopNav/LogoLink';
import ServiceLink from './DesktopNav/ServiceLink';
import StyledHeaderLink from './DesktopNav/StyledHeaderLink';
import getServiceInfo from '../../utils/getServiceInfo';
import { LogoStyleContext, logoStyleDefaults } from '../../context/PageContext';

const StyledLinksContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const TopNavBranding = ({ slug }) => (
  <StaticQuery
    query={graphql`
      {
        services: allContentfulService {
          nodes {
            slug
            specialityAreaItems1 {
              id
              slug
              title
            }
            specialityAreaItems2 {
              id
              slug
              title
            }
            specialityAreaItems3 {
              id
              slug
              title
            }
            specialityAreaItems4 {
              id
              slug
              title
            }
          }
        }
        specialities: allContentfulSpeciality {
          nodes {
            slug
            logoColour
          }
        }
      }
    `}
    render={({ services, specialities }) => {
      const { isServicePage, isSpecialityPage, service } = getServiceInfo({
        services,
        specialities,
        slug,
      });

      const {
        fillColorInitial = logoStyleDefaults.fillColorInitial,
        fillColorHover = logoStyleDefaults.fillColorHover,
        textColor = logoStyleDefaults.textColor,
        serviceColor = fillColorInitial,
      } = {
        ...logoStyleDefaults,
        // eslint-disable-next-line react-hooks/rules-of-hooks
        ...useContext(LogoStyleContext),
      };

      return (
        <StyledLinksContainer>
          <LogoLink
            fillColorInitial={fillColorInitial}
            fillColorHover={fillColorHover}
            textColor={textColor}
          />
          {isSpecialityPage || isServicePage ? (
            <ServiceLink
              isSpecialityPage={isSpecialityPage}
              isServicePage={isServicePage}
              service={service}
              color={serviceColor}
            />
          ) : (
            <StyledHeaderLink color={fillColorInitial} as="h3">
              {slug}
            </StyledHeaderLink>
          )}
        </StyledLinksContainer>
      );
    }}
  />
);

export default TopNavBranding;
