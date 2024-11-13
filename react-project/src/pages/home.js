import React from 'react'
import {Button} from 'react-bootstrap'
import {URL} from '../deployConfig'
import axios from 'axios'



class Home extends React.Component {

  constructor(props){
    super(props);


    this.state = { name: 'home',
                    content:'',
                    imgUrl:'',
                    customFields:[]
                  };

    axios({method:'get',url:`${URL.apiUrl}/content-builder.php?type=react`})
    .then( res => {

      this.setState({
            content: res.data[0].content,
            imgUrl: res.data[0].imgUrl,
            customFields: (res.data[0].customFields).split('//')

          })
    })//then-end
    .catch( err => {
      this.setState(
        {
          imgUrl:`/img/IMG_3070.JPEG` ,
          content:`
          <h1  class="db-error-h1 "><strong >React Project</strong></h1>
          
           <p>
              I created this SPA site just to showcase the solutions I came up with when solving programming exercises. Please, click on Templates over the Navigation Menu and you will see the solutions
          </p>
          <h3 ><strong >Technologies Used</strong></h3>
          <ul >
             <li >Bootstrap</li>
             <li >Mysql</li>
             <li >PHP (BackEnd)</li>
             <li >React</li>
             <li >React Copy-to-clipboard</li>
             <li >React Syntax-highlighter</li>
          </ul>
          `
        }
    )
    })

  }








  render() {
    return (
      <div className="row no-gutters border bg-night-time mt-4 mb-4">
        <div className="col-md-12  p-4">
          <div className="row ">
            <div className="col-md-6">
              <div className="border rounded p-4 text-white h-100 text-center">
                <p className="my-4">
                  { this.state.customFields.length > 0 ? this.state.customFields[0] : `“A day without laughter is a day wasted.” ― Nicolas Chamfort`  }
                </p>
                <img src={this.state.imgUrl} alt="Ronald Cortez" className="img-pic"/>
                <p className="my-4">
                  { this.state.customFields.length > 0 ? this.state.customFields[1] : `“It is not in the stars to hold our destiny but in ourselves.” ― William Shakespeare`  }
                </p>
                <Button variant="outline-light" size="lg" className="rounded-pill my-4" href={`${URL.rootURL}resume-download`} target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-file-text px-5" ></i>
                  <span className="d-block font-weight-light span-vr">View Resume</span>
                </Button>


              </div>

            </div>
            <div className="col-md-6">
              <div
              className="border rounded p-4 bg-leaf h-100"
              dangerouslySetInnerHTML={{ __html: this.state.content  }}></div>
            </div>
          </div>



        </div>
      </div>

    )
  }
}
export default Home
