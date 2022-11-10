import React from 'react';
import styled from 'styled-components';
import { Padding } from 'styled-components-spacing';
import InternalAnchor from '../Common/InternalAnchor';
import remcalc from 'remcalc';
import breakpoint from 'styled-components-breakpoint';

import { Grid, Row, Col } from '../../components/grid';
import ExternalAnchor from '../Common/ExternalAnchor';

import { social, gdpr } from './links';

export const FooterBanner = styled.section`
  background: ${(props) => props.theme.colors.text};
`;

export const Social = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: ${remcalc(24)};
  align-items: center;

  @media (max-width: 500px) {
    li {
      margin-bottom: ${remcalc(24)};
    }
  }

  ${breakpoint('desktop')`
    height: ${remcalc(48)};
    padding-bottom: 0;
  `}

  li:not(:last-child) {
    margin-right: ${remcalc(24)};
  }
`;

const GDPR = styled.div`
  display: flex;
  color: white;
  flex-wrap: wrap;

  a {
    padding: ${remcalc(12)} ${remcalc(36)} ${remcalc(12)} 0;
  }

  ${breakpoint('desktop')`
    justify-content: flex-end;
    a {
      padding: ${remcalc(12)} 0 ${remcalc(12)} ${remcalc(36)};
    }
  `}
`;

const LinkUnderline = styled(InternalAnchor)`
  text-decoration: underline;
`;

const FooterLinks = () => (
  <FooterBanner>
    <Padding top={3} bottom={3}>
      <Grid>
        <Row>
          <Col width={[1, 1, 1, 1, 1, 1, 5 / 12]}>
            <Social>
              {social.map((link) => (
                <li key={link.label}>
                  <ExternalAnchor
                    rel="me"
                    href={link.to}
                    title={`yld ${link.label} Account`}
                  >
                    <img src={link.img} alt={link.label} />
                  </ExternalAnchor>
                </li>
              ))}
            </Social>
          </Col>
          <Col width={[1, 1, 1, 1, 1, 1, 7 / 12]}>
            <GDPR>
              {gdpr.map((link) => (
                <LinkUnderline key={link.label} to={link.to} title={link.label}>
                  {link.label}
                </LinkUnderline>
              ))}
            </GDPR>
          </Col>
        </Row>
      </Grid>
    </Padding>
  </FooterBanner>
);

export default FooterLinks;
