/* eslint-disable */
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


    this.state = { 
                   rts: [], 
                   platformBlob:[], 
                   currentPage:{
                                 "platform": "",
                                 "lng": "stupid",
                                 "module": "",
                                 "title": "",
                                 "dsc": "",
                                 "permLink": "java/arrays",
                                 "hasCode": "1",
                                 "platform_url": ""
                   },
                  quePase:'elImbecil'
                }

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



componentLookup(event,index){

 this.state.currentPage = index
 event.preventDefault();

  console.log('lookupCurrent',index,this.state,event)
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
                <Nav.Link href='#' onClick={(event)=> {event.preventDefault(); this.setState({title:'',lng:'stupid'})}}>Home</Nav.Link>
                  <NavDropdown title="Templates" id="basic-nav-dropdown" onToggle={()=> document.querySelector('body').classList.toggle('overflow-hidden') }>


                  {
                    nav.map( (item,i) => (

                        <React.Fragment key={i}>
                        <NavDropdown.Item
                        key={item.name}
                        href="#"
                        target="_blank"
                        className="platform-bar">
                        {item.name}
                        </NavDropdown.Item>
                        <NavDropdown.Divider/>

                        {  (item.items).map( (item,index) => (
                            <NavDropdown.Item
                            key={index}
                            href="#"
                            id={item.permLink}
                            onClick={(event,item)=>{
                             event.preventDefault();
                            
                            var rt = this.state.rts.filter((rts)=> rts.permLink == event.target.id)
                             
                            this.state.currentPage = {...rt[0]}
                            this.setState({quePase:'elEstupido'})
                            
 
                            // console.log('page',this.state.currentPage);

                            				
}}
                            
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
          <div>
             {
                 this.state.currentPage.title === '' ?
                   <Home />
                :''
             }
             <CodeTemplate content={this.state.currentPage} key={this.state.currentPage.permLink} id={this.state.currentPage.permLink} />
         </div>        
      </div>
    )
  }

}
export default Routing
