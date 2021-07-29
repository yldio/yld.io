import React, { PureComponent } from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import Theme from './theme';
import Tab, { Tabs } from '../src/components/Common/Tab';

addDecorator(Theme);

class MultipleTabs extends PureComponent {
  state = {
    current: 0,
  };

  tabs = ['First Tab', 'Second Tab', 'Third Tab'];

  render() {
    return (
      <Tabs>
        {this.tabs.map((tab, idx) => (
          <Tab
            key={idx}
            current={this.state.current === idx}
            onClick={() => this.handleClick(idx)}
          >
            {tab}
          </Tab>
        ))}
      </Tabs>
    );
  }

  handleClick = (idx) => {
    this.setState((prevState) => ({
      current: prevState.current === idx ? undefined : idx,
    }));
  };
}

storiesOf('Tabs', module)
  .add('Single Tab - current', () => (
    <Tab current as="p">
      This is a tab
    </Tab>
  ))
  .add('Single Tab - inactive', () => <Tab current={false}>This is a tab</Tab>)
  .add('Multiple Tabs', () => {
    return <MultipleTabs />;
  });
