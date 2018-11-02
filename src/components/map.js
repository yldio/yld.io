// src/components/Map.js
import React, { Component } from 'react'

export default class Map extends Component {
  onLoad = () => {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options
    )
    this.props.onMount(map)
  }

  componentDidMount () {
    if (window.google) this.onLoad()
  }

  render () {
    return (
      <div
        style={{
          width: 454,
          height: 360
        }}
        id={this.props.id}
      />
    )
  }
}
