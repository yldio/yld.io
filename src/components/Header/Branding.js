import React, { useContext } from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

import LogoLink from './DesktopNav/LogoLink';
import ServiceLink from './DesktopNav/ServiceLink';
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

      let {
        type,
        fillColorInitial = logoStyleDefaults.fillColorInitial,
        fillColorHover = fillColorInitial,
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
            squared={type === 'squared'}
            fillColorInitial={fillColorInitial}
            fillColorHover={fillColorHover}
            textColor={textColor}
          />
          {(isSpecialityPage || isServicePage) && (
            <ServiceLink
              isSpecialityPage={isSpecialityPage}
              isServicePage={isServicePage}
              service={service}
              color={serviceColor}
            />
          )}
        </StyledLinksContainer>
      );
    }}
  />
);

export default TopNavBranding;
