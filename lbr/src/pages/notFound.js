import React from 'react'
import { Link} from 'react-router-dom'


class NotFound extends React.Component {

  render() {
    return (
      <div className="col-md-12">
        <h1>404</h1>
        <p><Link to="/">Back</Link></p>
      </div>

    )
  }
}
export default NotFound
