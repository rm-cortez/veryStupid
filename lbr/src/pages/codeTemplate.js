import React from 'react'
import {URL} from '../deployConfig'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {Button,Breadcrumb, Badge} from 'react-bootstrap'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Anchors from '../htmlElements/anchors'


class CodeTemplate extends React.Component {

  constructor(props){
    super(props)

    console.log('props',props)
    this.state = {
                    copied: false,
                    btnLabel: 'Copy',
                    hasContent: 0
                  };
  }

  render() {
    //let content = this.props.content.title;
    return (



      <div className={this.props.content.lng == 'stupid' ? 'stupid' : 'row'}>
       

        <div className="col-md-12 mb-4">
        <h1 className="lng-name">{this.props.content.lng}</h1>

        <Breadcrumb className="template-breadcrumb">
          <Breadcrumb.Item href ={URL.passUrl}>Home</Breadcrumb.Item>
          <Breadcrumb.Item href={`${URL.passUrl}${this.props.content.module}` }>{this.props.content.module}</Breadcrumb.Item>
          {

            this.props.content.hasCode === '1' ? <Breadcrumb.Item active>{this.props.content.title}</Breadcrumb.Item> : ''

          }

        </Breadcrumb>
        </div>
        <div className="col-md-12">
            <div className="row no-gutters">
              <div className="col-md-12 p-2 mb-4 mt-4  border rounded bg-dark">
              {
                this.props.content.hasCode === '1' ?
                <h2 className="template-fieldset">
                  <Badge variant="dark">Description:</Badge>
                </h2>:''
              }

                <div className="bg-white p-4 dsc-section">

                  {
                    this.props.content.hasCode === '1' ?
                    <div dangerouslySetInnerHTML={{ __html: this.props.content.dsc  }}>
                    </div>:
                    <Anchors content={this.props.content.dsc}></Anchors>
                }
                </div>
              </div>
              <div className={ `col-md-12 mt-4 mb-4 p-2  border rounded bg-dark ${ this.props.content.hasCode === '0' ? 'd-none':'' }` }>
              <div className="copy-clipboard-section mb-2 text-right">
                <CopyToClipboard text={this.props.content.code}
                  onCopy={() => {
                    this.setState({copied: true, btnLabel:'Copied!'})
                    setInterval( ()=>{
                        this.setState({ btnLabel:'Copy'})
                    },1000)

                  }}>
                  <Button variant="outline-success">
                            {this.state.btnLabel}
                  </Button>
                </CopyToClipboard>
              </div>
                <div className="bg-white p-2 ">
                  <SyntaxHighlighter language="javascript" style={atomOneDark}>
                  {this.props.content.code}
                </SyntaxHighlighter>
                </div>
              </div>
            </div>
        </div>
     
      </div>/*row end*/


    )//render end
  }
}
export default CodeTemplate
