import React from 'react'
import { Icon } from 'antd'
export class Foot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      link: 'https://github.com/d1y',
      author: 'd1y'
    }
  }
  render() {
    return (
      <h4 style={{ textAlign: 'center' }}>
        create by
        <a target="_blank" href={ this.state.link } style={{ 
          display: 'inline-block',
          color: 'red',
          margin: '2px 8px'
        }}>
          { this.state.author }
        </a>
        <Icon type="github" />
      </h4>
    )
  }
}