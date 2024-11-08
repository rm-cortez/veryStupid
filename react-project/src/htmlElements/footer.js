import React from 'react'
import { Row,Col } from 'react-bootstrap';

class Footer extends React.Component {
  constructor(props){
    super(props);
    this.state = { year: (new Date()).getFullYear()  };

  }

  render() {
    return (

      		<Row  className="bg-dark">
      			<Col className="col-md-12 text-center p-3 text-white">
      				<a href="/">RCSProductions <i className="fa fa-copyright"></i></a> | {this.state.year}
            </Col>
      		</Row>


    )
  }

}
export default Footer
