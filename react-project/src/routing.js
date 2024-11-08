import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Navbar,Nav,Row,Col , NavDropdown} from 'react-bootstrap'
import Home from './pages/home';
/*import NotFound from './pages/notFound';*/
import CodeTemplate from './pages/codeTemplate';
import logo from './logo.png';
import {URL} from './deployConfig'
//import axios from 'axios'
import {apiData} from './apiData.js'




class Routing extends React.Component {

  constructor(props){
    super(props);


    this.state = { rts: [], platformBlob:[]}
    this.createPlatformBlob = this.createPlatformBlob.bind(this)

    this.createPlatformBlob(apiData)

/*
    axios({method:'get',url:`${URL.apiUrl}/json-builder.php`})
    .then(response => {




                    let data = response.data

                    this.createPlatformBlob(data)

                  })//axios fetch
                  .catch(err => {
                    this.createPlatformBlob(apiData)
                  })

*/
  }//constructor


/*
componentDidMount(){

  this.createPlatformBlob(apiData)
}

*/


  createPlatformBlob(data){

    console.log('didMount',data)

    let platforms =  new Set()
    let platformBlob = []

    data.forEach((item,i) => {
      platforms.add(item.platform)
    })


    platforms.forEach((item,i) => {


      platformBlob.push({
        name: item,
        url: data[data.findIndex(d => d.platform === item && d.hasCode === '1')].platform_url,
        items: data.filter( d =>  d.platform === item && d.hasCode === '1')
      })


    })


/*
    this.setState({
      rts: data,
      platformBlob: platformBlob
    })
*/

    this.state.rts= data
    this.state.platformBlob = platformBlob

    console.log('data',this.state)

  }//createPlatformBlob end


  render() {

    //dev / prod -> Set variable in deployConfig
    let baseURL = '/react-project'    //URL.passUrl
    let routes = this.state.rts

    console.log('render',baseURL,routes)

    let nav = this.state.platformBlob



    return(

      <div className="header-main-content">

        
          <header className="rcs-header">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">
            <img
            alt="RCSProductions"
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            />{' '}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="mr-auto">
                <Nav.Link href={baseURL}>Home</Nav.Link>
                  <NavDropdown title="Templates" id="basic-nav-dropdown" onToggle={()=> document.querySelector('body').classList.toggle('overflow-hidden') }>


                  {
                    nav.map( (item,i) => (

                        <React.Fragment key={i}>
                        <NavDropdown.Item
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        className="platform-bar">
                        {item.name}
                        </NavDropdown.Item>
                        <NavDropdown.Divider/>

                        {  (item.items).map( (item,index) => (
                            <NavDropdown.Item
                            key={index}
                            href={baseURL + (item.permLink) }
                            className="nav-inline-anchors">
                            {item.title}
                          </NavDropdown.Item>
                          ))}
                        </React.Fragment>
                    ))

                  }

                </NavDropdown>
                <div className="header-bg" ></div>
               </ Nav>
            </Navbar.Collapse>
          </Navbar>
          </header>
          <Row className="main-content pt-4">
            <Col className="col-md-12">
              <div>
		stupid
              

              { ( routes ).map((route,index) => (
                  <div  className={'/' + (route.permLink) }  key={index} >
                  {'/' + (route.permLink) } 
                  </div>
              ))}


              </div>
            </Col>
            <div>

           </div>
          </Row>
          <div>
             <CodeTemplate content={{
    "platform": "codingbat",
    "lng": "Java",
    "module": "Arrays",
    "title": "Arrays3",
    "dsc": "Given two arrays of ints sorted in increasing order, outer and inner,\r\nreturn true if all of the numbers in inner appear in outer.\r\nThe best solution makes only a single \"linear\" pass of both arrays,\r\ntaking advantage of the fact that both arrays are already in sorted order. ",
    "code": "public boolean linearIn(int[] outer, int[] inner)\r\n{\r\n  int flag = 0;\r\n\r\n  for(int i =0; i < inner.length; i++)\r\n  {\r\n\r\n    for(int j=0; j < outer.length;j++)\r\n    {\r\n         if(inner[i] == outer[j])\r\n         {\r\n           flag++;\r\n            break;\r\n          }\r\n    }\r\n\r\n  }\r\n\r\n  return flag == inner.length;\r\n}",
    "permLink": "java/arrays/arrays3",
    "hasCode": "1",
    "platform_url": "https://codingbat.com/java"
}} key="stupid"/>
         </div>        
      </div>
    )
  }

}
export default Routing
