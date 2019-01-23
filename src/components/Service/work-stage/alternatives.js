import React, { Component } from 'react'
import WorkStage from './stage'

class WorkStageAlternatives extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedAlternative: this.props.workStage }
    this.handleClick = this.handleClick.bind(this)
    this.alternatives = this.props.workStage.alternativeTitle
      ? [
          this.props.workStage.alternativeTitle,
          ...this.props.workStage.alternativeWorkStages.map(
            ({ alternativeTitle }) => alternativeTitle
          )
        ]
      : null
  }
  handleClick(selected) {
    let workStage = this.props.workStage
    if (workStage.alternativeTitle === selected) {
      this.setState({ selectedAlternative: workStage })
    } else {
      this.setState({
        selectedAlternative: workStage.alternativeWorkStages.filter(
          ({ alternativeTitle }) => alternativeTitle === selected
        )[0]
      })
    }
  }

  render() {
    return (
      <WorkStage
        handleClick={this.handleClick}
        alternatives={this.alternatives}
        workStage={this.state.selectedAlternative}
      />
    )
  }
}

export default WorkStageAlternatives
