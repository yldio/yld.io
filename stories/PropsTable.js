import React from 'react'
import styled from 'styled-components'

// propDefinitions: Array<{
//   property: string, // The name of the prop
//   propType: Object | string, // The prop type. TODO: info about what this object is...
//   required: boolean, // True if the prop is required
//   description: string, // The description of the prop
//   defaultValue: any // The default value of the prop
// }>

const Table = styled.table`
  margin-top: 50px;
  margin-bottom: 50px;
`

const Th = styled.th`
  padding-right: 20px;
  padding-bottom: 10px;
  text-align: left;
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
  border: none;
  border-bottom: 1px;
`

const Td = styled.td`
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 10px;
  padding-left: 10px
  vertical-align: top;
  border: none;
  color: grey;
  border: 0.5px solid #e6e6e6;
  font-size: 14px;
`

const Props = ({ propDefinitions }) => {
  return propDefinitions.map(prop => {
    const { property, propType, required, defaultValue, description } = prop
    return (
      <tr key={property}>
        <Td style={{ color: '#FF4400' }}>{property || '-'}</Td>
        <Td style={{ color: '#66BF3C' }}>{propType || '-'}</Td>
        <Td>{required ? 'yes' : 'no'}</Td>
        <Td style={{ color: '#1EA7FD' }}>{defaultValue || '-'}</Td>
        <Td>{description || '-'}</Td>
      </tr>
    )
  })
}

const PropsTable = ({ propDefinitions }) => {
  return (
    <div>
      <hr />
      <Table>
        <tr>
          <Th>property</Th>
          <Th>propType</Th>
          <Th>required</Th>
          <Th>default</Th>
          <Th>description</Th>
        </tr>
        <Props propDefinitions={propDefinitions} />
      </Table>
    </div>
  )
}

export default PropsTable
