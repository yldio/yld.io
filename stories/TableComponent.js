import React from 'react';
import generate from 'shortid';
import styled from 'styled-components';

// Used inline styling because the css styles are not applyed to the styled-component class
// Css properties are copied from the default TableComponent provided by storybook-addon-react-docgen

const Table = styled.table``;
const tableStyles = {
  width: '100%',
  margin: '2rem 0',
  borderCollapse: 'collapse',
};

const Tr = styled.tr``;

const Th = styled.th``;
const thStyles = {
  paddingRight: '20px',
  paddingBottom: '10px',
  textAlign: 'left',
  fontWeight: 'bold',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  border: 'none',
  borderBottom: '1px solid #ccc',
};

const Td = styled.td``;
const tdStyles = {
  paddingRight: '20px',
  paddingTop: '15px',
  paddingBottom: '15px',
  verticalAlign: 'top',
  border: 'none',
  fontWeight: 400,
};

const TableHeadings = () => {
  return (
    <Tr>
      <Th style={thStyles}>property</Th>
      <Th style={thStyles}>propType</Th>
      <Th style={thStyles}>required</Th>
      <Th style={thStyles}>defaultValue</Th>
      <Th style={thStyles}>description</Th>
    </Tr>
  );
};

const TableData = ({ propData, descriptions = {} }) => {
  return propData.map(data => {
    const { property, propType, required, defaultValue, description } = data;
    return (
      <Tr key={generate()}>
        <Td style={(tdStyles, { color: 'red' })}>{property}</Td>
        <Td style={(tdStyles, { color: 'green' })}>{propType || '-'}</Td>
        <Td style={tdStyles}>{required ? 'yes' : 'no'}</Td>
        <Td style={(tdStyles, { color: 'blue' })}>
          {defaultValue ? JSON.stringify(defaultValue) : '-'}
        </Td>
        <Td style={tdStyles}>
          {description ? description : descriptions[property] || '-'}
        </Td>
      </Tr>
    );
  });
};

const TableComponent = ({ propDefinitions = {}, descriptions }) => {
  return (
    <Table style={tableStyles}>
      <TableHeadings />
      <TableData propData={propDefinitions} descriptions={descriptions} />
    </Table>
  );
};

export default TableComponent;
