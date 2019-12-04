import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import ReactMarkdown from 'react-markdown';

import StyledLink from './StyledLink';
import GreyBackground from './GreyBackground';
import { Row, Col, Grid } from '../grid';
import { DisplayTitle } from '../Typography';

const PaddedGrid = styled(Grid)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}
`;

const Link = styled(StyledLink)`
  margin-bottom: 0;
  margin-left: 0;
  padding: 0;
  font-weight: normal;
  text-decoration: underline;
  display: initial;
`;

const StyledDisplayTitle = styled(DisplayTitle)`
  > strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
  }
`;

const Statement = ({ richText, children, as = 'h2', dataEvents }) => (
  <GreyBackground>
    <PaddedGrid>
      <Row>
        <Col width={[1, 1, 1, 10 / 12, 10 / 12, 9 / 12]}>
          {richText ? (
            <DisplayTitle secondary>
              {richText.map(({ nodeType, data, value, content }) => {
                if (nodeType === 'text') return value;

                if (nodeType === 'hyperlink') {
                  const label = content[0].value.split(' ').join('-');

                  const dataEvent = dataEvents && {
                    'data-event': `${dataEvents}-${label}`,
                  };

                  return (
                    <Link
                      key={data.uri}
                      noafter="true"
                      to={`${data.uri}`}
                      {...dataEvent}
                    >
                      {content[0].value}
                    </Link>
                  );
                }

                return '';
              })}
            </DisplayTitle>
          ) : (
            <ReactMarkdown
              renderers={{
                // eslint-disable-next-line
                headings: props => (
                  <StyledDisplayTitle as={as} secondary {...props} />
                ),
                // eslint-disable-next-line react/display-name
                paragraph: props => (
                  <StyledDisplayTitle as={as} secondary {...props} />
                ),
              }}
              source={children}
            />
          )}
        </Col>
      </Row>
    </PaddedGrid>
  </GreyBackground>
);

export default Statement;
