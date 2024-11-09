import React from 'react'
import axios from 'axios'





class Routing extends React.Component {

  constructor(props){
    super(props);


    this.state = { 
        rts: [], 
        platformBlob:[], 
        currentPage:{}, 
        docSelected:1, 
        casesSelected:0,
        dateStart:null,
        dateEnd:null
    }
    this.createPlatformBlob = this.createPlatformBlob.bind(this)
    this.componentLookup = this.componentLookup.bind(this)
    this.dateStart = this.dateStart.bind(this)
    this.dateEnd = this.dateEnd.bind(this)
    this.searchBtn = this.searchBtn.bind(this)

    //this.createPlatformBlob(apiData)

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



componentLookup(event){

 //this.state.currentPage = index

  console.log('lookupCurrent',event.target.id)


  if(event.target.id == 'docs'){
    this.setState({
      docSelected:1,
      casesSelected:0
    })
    
    
  }
  else{
    this.setState({
      docSelected:0,
      casesSelected:1
    })
  }

}

dateStart(event){

  console.log('date.Start',event.target.value)
  this.setState({
    dateStart:event.target.value
  })
}

dateEnd(event){
  console.log('date.dateEnd',event.target.value)

  this.setState({
    dateEnd:event.target.value
  })
}




  createPlatformBlob(data){

    console.log('didMount',data)

 


/*
    this.setState({
      rts: data,
      platformBlob: platformBlob
    })
*/

    // this.state.rts= data
    // this.state.platformBlob = platformBlob

    console.log('data',this.state)

  }//createPlatformBlob end


  searchBtn(){
    console.log(this.state)
  }


  render() {




    console.log('render')





    return(

      <div className="row">
          <div className="col-md-2">

        <div className="sidebar-header">

        </div>
        <div className="sidebar-content">
          <div className='sidebar-icon'></div>
          Dashboard
        </div>

        <div className="sidebar-content highlighted">
          <div className='sidebar-icon'></div>
          Advanced Search
        </div>
        </div>

        <div className="col-md-10 main-view">

        <div className='App-header'>

        </div>

        <div className="main-content">

        <div className="row search">

          <div className="col-md-4">

            <div className="choice-picker">
                <div id="docs" className={this.state.docSelected == 1 ? ' selected': ''} onClick={this.componentLookup}> 
                  Documents
                </div>

                <div id="cases" className={this.state.casesSelected == 1 ? ' selected': ''}  onClick={this.componentLookup}>
                  Cases
                </div>

            </div>

          </div>

          <div className="col-md-8">

            <div className="input-group mb-3">
              <input type="date" className="form-control" placeholder="Start Date" aria-label="Start Date"  onChange={this.dateStart}/>
              <input type="date" className="form-control" placeholder="End Date" aria-label="Start Date"  onChange={this.dateEnd}/>
              <button className="btn btn-search " onClick={this.searchBtn}>
              <i className="fa fa-search"></i>&nbsp;
                Search
              </button>
            </div>
          </div>

          <div className="col-md-12 Loading">
            Loading...
            <br />&nbsp;
          </div>
        </div>

        <div className="row results">

          <div className="col-md-12">
            <table className="table table-bordered">
              <thead>
                  <tr>
                      <th>&nbsp;</th>
                      <th>Court</th>
                      <th>Case Filing Date</th>
                      <th>Case Name</th>
                      <th>Case Number</th>
                  </tr>
              </thead>
              <tbody>

                      <tr>
                          <td className="centered">
                            <input type="checkbox" className='inp-picker' />
                          </td>
                          <td>@forecast.Date.ToShortDateString()</td>
                          <td>@forecast.TemperatureC</td>
                          <td>@forecast.TemperatureF</td>
                          <td>@forecast.Summary</td>
                      </tr>
                  
              </tbody>
          </table>`

            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
              </ul>
            </nav>
          </div>
        `          
        </div>
        </div>

        </div>
      </div>
    )
  }

}
export default Routing
