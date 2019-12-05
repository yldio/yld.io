import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import is from 'styled-is';

const CaseStudiesGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${({ theme }) => theme.space[4]};

  img {
    max-height: initial;
  }

  /* for the following breakpoint-specific nth-child rules, keep in mind that every group of 5 grid items is:
   * hr,
   * poster, or
   * card,
   * intro,
   * read more link
   */

  ${breakpoint('smallPhone', 'smallTablet')`
    grid-template-columns: 1fr;

    > * {
      grid-column: 1
    }

    /* Hide the hr above the first row */
    > hr:first-child {
      display: none;
    }

    ${is('limited')`
      > *:nth-child(n + 11) {
        display: none;
      }
    `}
  `}

  ${breakpoint('smallTablet', 'tablet')`
    grid-template-columns: 1fr 1fr;

    > *:nth-child(10n + 1),
    > *:nth-child(10n + 2),
    > *:nth-child(10n + 3),
    > *:nth-child(10n + 4),
    > *:nth-child(10n + 5) {
      grid-column-start: 1;
    }

    > *:nth-child(10n + 6),
    > *:nth-child(10n + 7),
    > *:nth-child(10n + 8),
    > *:nth-child(10n + 9),
    > *:nth-child(10n + 10) {
      grid-column-start: 2;
    }

    /* starting from the second row, extend the left hr to the entire width of the grid */
    > hr:nth-of-type(2n + 3) {
      grid-column-end: -1;
    }
    /* hide all other hrs, including all hrs at the top */
    > hr:not(:nth-of-type(2n + 3)) {
      display: none;
    }

    ${is('limited')`
      > *:nth-child(n + 11) {
        display: none;
      }
    `}

    /* starting from the second row (child 11), hide the left col if there is no right col */
    ${is('hideSparseRows')`
      > *:nth-child(10n + 11):nth-last-child(5),
      > *:nth-child(10n + 12):nth-last-child(4),
      > *:nth-child(10n + 13):nth-last-child(3),
      > *:nth-child(10n + 14):nth-last-child(2),
      > *:nth-child(10n + 15):nth-last-child(1) {
        display: none;
      }
    `}
  `}

  ${breakpoint('tablet')`
    grid-template-columns: 1fr 1fr 1fr;

    > *:nth-child(15n + 1),
    > *:nth-child(15n + 2),
    > *:nth-child(15n + 3),
    > *:nth-child(15n + 4),
    > *:nth-child(15n + 5) {
      grid-column-start: 1;
    }

    > *:nth-child(15n + 6),
    > *:nth-child(15n + 7),
    > *:nth-child(15n + 8),
    > *:nth-child(15n + 9),
    > *:nth-child(15n + 10) {
      grid-column-start: 2;
    }

    > *:nth-child(15n + 11),
    > *:nth-child(15n + 12),
    > *:nth-child(15n + 13),
    > *:nth-child(15n + 14),
    > *:nth-child(15n + 15) {
      grid-column-start: 3;
    }

    /* starting from the second row, extend the left hr to the entire width of the grid */
    > hr:nth-of-type(3n + 4) {
      grid-column-end: -1;
    }
    /* hide all other hrs, including all hrs at the top */
    > hr:not(:nth-of-type(3n + 4)) {
      display: none;
    }

    ${is('limited')`
      > *:nth-child(n + 16) {
        display: none;
      }
    `}

    /* starting from the second row (child 16), hide: */
    ${is('hideSparseRows')`
      /* the left column if there is a middle, but no right column */
      > *:nth-child(15n+16):nth-last-child(10),
      > *:nth-child(15n+17):nth-last-child(9),
      > *:nth-child(15n+18):nth-last-child(8),
      > *:nth-child(15n+19):nth-last-child(7),
      > *:nth-child(15n+20):nth-last-child(6),
      /* the left column if there is no middle or right column */
      > *:nth-child(15n+16):nth-last-child(5),
      > *:nth-child(15n+17):nth-last-child(4),
      > *:nth-child(15n+18):nth-last-child(3),
      > *:nth-child(15n+19):nth-last-child(2),
      > *:nth-child(15n+20):nth-last-child(1),
      /* the middle column if there is no right column */
      > *:nth-child(15n+21):nth-last-child(5),
      > *:nth-child(15n+22):nth-last-child(4),
      > *:nth-child(15n+23):nth-last-child(3),
      > *:nth-child(15n+24):nth-last-child(2),
      > *:nth-child(15n+25):nth-last-child(1) {
        display: none
      }
    `}
  `}
`;

export default CaseStudiesGrid;
