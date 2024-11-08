import React from 'react'
import { Link } from 'react-router-dom'

class Anchors extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    let links = new Array()
    let content = (this.props.content).split(';')

    content.forEach((item, i) => {
      let link = item.split(',')
      links.push({
        to:link[0],
        label:link[1]
      })
    })


    return (

              <React.Fragment>
                {
                  links.map((item,i)=>(
                    <Link to={item.to} key={i}>{item.label}</Link>
                  ))
                }
              </React.Fragment>


    )
  }

}
export default Anchors
