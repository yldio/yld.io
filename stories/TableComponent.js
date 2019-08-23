import React from 'react'
import generate from 'shortid'
import styled from 'styled-components'

// Used inline styling because the css styles are not applyed to the styled-component class

const Table = styled.table``
const tableStyles = {
  width: '100%',
  textAlign: 'left',
  borderSpacing: '0px',
  backgroundColor: '#f5f9fc',
  padding: '20px',
  boxShadow: '0 1px 5px 0 rgba(0,0,0,0.1)',
  margin: '5px 0px'
}

const Tr = styled.tr``
const trStyles = {}

const Th = styled.th``
const thStyles = {
  padding: '10px',
  borderBottom: '1px solid #EEE'
}

const Td = styled.td``
const tdStyles = {
  padding: '10px'
}

const TableHeadings = () => {
  return (
    <Tr style={trStyles}>
      <Th style={thStyles}>property</Th>
      <Th style={thStyles}>propType</Th>
      <Th style={thStyles}>required</Th>
      <Th style={thStyles}>defaultValue</Th>
      <Th style={thStyles}>description</Th>
    </Tr>
  )
}

const TableData = ({ propData, descriptions = {} }) => {
  return propData.map(data => {
    const { property, propType, required, defaultValue, description } = data
    return (
      <Tr style={trStyles} key={generate()}>
        <Td style={tdStyles}>{property}</Td>
        <Td style={tdStyles}>{propType || '-'}</Td>
        <Td style={tdStyles}>{required ? 'yes' : 'no'}</Td>
        <Td style={tdStyles}>
          {defaultValue ? JSON.stringify(defaultValue) : '-'}
        </Td>
        <Td style={tdStyles}>
          {description ? description : descriptions[property] || '-'}
        </Td>
      </Tr>
    )
  })
}

const TableComponent = ({ propDefinitions = {}, descriptions }) => {
  return (
    <Table style={tableStyles}>
      <TableHeadings />
      <TableData propData={propDefinitions} descriptions={descriptions} />
    </Table>
  )
}

export default TableComponent
