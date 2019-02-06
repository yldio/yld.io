import React, { PureComponent } from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import Tab, { Tabs } from '../src/components/Common/Tab'

addDecorator(Theme)

class SingleTab extends PureComponent {
  state = {
    active: false
  }

  render() {
    return (
      <Tab active={this.state.active} onClick={this.handleClick}>
        This is a tab
      </Tab>
    )
  }

  handleClick = () => {
    this.setState({ active: !this.state.active })
  }
}

class MultipleTabs extends PureComponent {
  state = {
    active: 0
  }

  tabs = ['First Tab', 'Second Tab', 'Third Tab']

  render() {
    return (
      <Tabs>
        {this.tabs.map((tab, idx) => (
          <Tab
            key={idx}
            active={this.state.active === idx}
            onClick={() => this.handleClick(idx)}
          >
            {tab}
          </Tab>
        ))}
      </Tabs>
    )
  }

  handleClick = idx => {
    this.setState({ active: this.state.active === idx ? undefined : idx })
  }
}

storiesOf('Tabs', module)
  .add('Single Tab', () => {
    return <SingleTab />
  })
  .add('Multiple Tabs', () => {
    return <MultipleTabs />
  })
