import React from 'react'
import axios from 'axios'





class Routing extends React.Component {

  constructor(props){
    super(props);


    this.state = { rts: [], platformBlob:[], currentPage:{}}
    this.createPlatformBlob = this.createPlatformBlob.bind(this)
    this.componentLookup = this.componentLookup.bind(this)

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



componentLookup(index){

 this.state.currentPage = index

  console.log('lookupCurrent',index,this.state)
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
                <div className="docs selected">
                  Documents
                </div>

                <div className="cases">
                  Cases
                </div>

            </div>

          </div>

          <div className="col-md-8">

            <div class="input-group mb-3">
              <input type="date" class="form-control" placeholder="Start Date" aria-label="Start Date"  />
              <input type="date" class="form-control" placeholder="End Date" aria-label="Start Date"  />
              <button className="btn btn-search " >
              <i class="fa fa-search"></i>&nbsp;
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
            <table class="table table-bordered">
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
              <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
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
