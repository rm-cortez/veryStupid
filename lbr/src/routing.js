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


    this.state = { rts: [], platformBlob:[], currentPage:{}}
    this.createPlatformBlob = this.createPlatformBlob.bind(this)
    this.componentLookup = this.componentLookup.bind(this)

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



componentLookup(index){

 this.state.currentPage = index

  console.log('lookupCurrent',index,this.state)
}




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
                            onClick={this.componentLookup(item)}
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
    "lng": "stupid",
    "module": "Arrays",
    "title": "Fix45",
    "dsc": "(This is a slightly harder version of the fix34 problem.) Return an array that\r\ncontains exactly the same numbers as the given array, but rearranged so that every 4\r\nis immediately followed by a 5. Do not move the 4's, but every other number may move.\r\nThe array contains the same number of 4's and 5's, and every 4 has a number after it that\r\nis not a 4. In this version, 5's may appear anywhere in the original array.",
    "code": "public int[] fix45(int[] nums)\n{\n  int len = nums.length;\n  ArrayList fives = new ArrayList();\n\n\n  for(int i =0; i < len; i++)\n      if(nums[i] == 5 )\n      {\n        if(i == 0 )              fives.add(i);\n        else if( nums[i-1] != 4) fives.add(i);\n      }\n\n\n\n\n  for(int j = 0; j<len; j++)\n  {\n     if(nums[j] == 4 && nums[j+1] != 5)\n     {\n       nums[(Integer)fives.get(0)] = nums[j+1];\n       fives.remove(0);\n       nums[j+1] = 5;\n\n     }\n\n\n  }\n\n\n  return nums;\n\n}",
    "permLink": "java/arrays/fix45",
    "hasCode": "1",
    "platform_url": "https://codingbat.com/java"
}} />
         </div>        
      </div>
    )
  }

}
export default Routing
