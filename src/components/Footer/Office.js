import React from 'react';
import styled from 'styled-components';
import { Padding } from 'styled-components-spacing';
import PaddedCol from '../../components/AboutUs/PaddedCol';
import { Subtitle, BodyPrimary } from '../../components/Typography';

const StyledBodyPrimary = styled(BodyPrimary).attrs(() => ({
  noPadding: true,
}))`
  color: ${({ theme }) => theme.colors.white};
  padding-top: ${({ theme, hasPaddingTop }) =>
    theme.space[hasPaddingTop ? 3 : 0]};
  opacity: 0.5;
`;

const Office = ({ name, telephone, email, streetAddress }) => (
  <PaddedCol width={[1, 1, 1, 1 / 2, 1 / 2, 1 / 4]}>
    <Subtitle reverse>{name}</Subtitle>
    <Padding top={1} bottom={1}>
      {streetAddress.map((address) => (
        <StyledBodyPrimary key={address}>{address}</StyledBodyPrimary>
      ))}

      {telephone && (
        <StyledBodyPrimary itemProp="telephone" hasPaddingTop={telephone}>
          {telephone}
        </StyledBodyPrimary>
      )}

      {email && (
        <StyledBodyPrimary hasPaddingTop={email && !telephone}>
          <a href={`mailto:${email}`} title={`Email yld ${name} Office`}>
            {email}
          </a>
        </StyledBodyPrimary>
      )}
    </Padding>
  </PaddedCol>
);

export default Office;
