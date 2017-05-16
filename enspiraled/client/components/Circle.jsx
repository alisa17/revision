import React from 'react'

class Circle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      children: []
    }
  }

  showChildren() {
    const children = [
      {
        cx: this.props.cx - this.props.r,
        cy: this.props.cy,
        r: this.props.r / 2
      }
    ]
    //
    // The component state can be changed calling:
    // this.setState(data, callback);
    // This method performs a shallow merge of data into this.state and re-renders the component. The data argument can be an object or a function that returns an object containing keys to update.
    this.setState({children})
  }

  render() {
    return (
      <g>
        (<circle cx={this.props.cx} cy={this.props.cy} r={this.props.r} onMouseOver={() => this.showChildren()}/>) {this.state.children.map((child) => {
          return <Circle cx={child.cx} cy={child.cy} r={child.r}/>
        })
}
      </g>

    )
  }
}

export default Circle
