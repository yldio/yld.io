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
              components={{
                ...Object.fromEntries(
                  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((heading) => [
                    heading,
                    (props) => (
                      <StyledDisplayTitle secondary as={as} {...props} />
                    ),
                  ]),
                ),

                p: (props) => (
                  <StyledDisplayTitle secondary as={as} {...props} />
                ),
              }}
            >
              {children}
            </ReactMarkdown>
          )}
        </Col>
      </Row>
    </PaddedGrid>
  </GreyBackground>
);

export default Statement;
