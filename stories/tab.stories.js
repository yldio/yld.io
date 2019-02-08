import React, { useState } from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import Tab, { Tabs } from '../src/components/Common/Tab'

addDecorator(Theme)

const MultipleTabs = () => {
  const tabs = ['First Tab', 'Second Tab', 'Third Tab']
  const [active, setActive] = useState(0)

  const handleClick = idx => {
    setActive(active === idx ? undefined : idx)
  }

  return (
    <Tabs>
      {tabs.map((tab, idx) => (
        <Tab key={idx} active={active === idx} onClick={() => handleClick(idx)}>
          {tab}
        </Tab>
      ))}
    </Tabs>
  )
}

storiesOf('Tabs', module)
  .add('Single Tab - active', () => (
    <Tab active as="p">
      This is a tab
    </Tab>
  ))
  .add('Single Tab - inactive', () => <Tab active={false}>This is a tab</Tab>)
  .add('Multiple Tabs', () => {
    return <MultipleTabs />
  })
