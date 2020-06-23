import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import './Home.css'
import { requestApiData } from "./actions";
import { Table } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {Jumbotron} from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast'
import Badge from 'react-bootstrap/Badge'
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.data.data,


    };
  }

  handleClick(results){

    console.log(this.props.data);


  }
  componentDidMount() {
    this.props.requestApiData();
    console.log(this.props.data);
    
  }

   render() {
  const results = this.props.data;
  console.log(results)

  return results && results.data
      ?
          
    <div className="main-container">
    <Card body>
      <div className="companyInformation">
      
         <p>
           <img src={results.data.company.logo} style={{ width: '20px' }}/>
           <br />
           {results.data.company.name}
           <br />
           {results.data.company.address}
           <br />
           {results.data.company.email}
           <br />
           {results.data.company.mobile}
         </p>
         
         
      </div>

      <div className="clientOrderInformation">

        <div className="clientInformation">
          <h6>CLIENT INFORMATION</h6>
          
          <p>
            {results.data.client.name}
            <br />
            {results.data.client.address}
            <br />
            {results.data.client.email}
            <br />
            {results.data.client.mobile}
          </p>
        </div>
        <div className="orderInformation">
          <h6>ORDER INFORMATION </h6>
            <p>
            DATE:{results.data.order.date}
            <br />
            STATUS:<Badge variant="warning">{results.data.order.status}</Badge>
            <br />
            ID:{results.data.order.id}
            </p>
          </div>

          <div className="invoiceNumber">
            <h6> INVOICE NUMBER # {results.data.order.invoice_number} </h6>
            <div className="invoiceNumber1">
            <p >TOTAL DUE:{results.data.order.currency}{results.data.order.amount}</p>
            </div>
          </div>
        

      </div>
      


      

      <div className="orderItems">
        <Table responsive="sm">
    <thead>
      <tr>
        
        <th>Description</th>
        <th>Quantity</th>
        <th>Amount</th>
        <th>Total</th>
        
      </tr>
    </thead>
    <tbody>
    {results.data.order_items.map(function (role, i){
     return <tr>
       
        <td>
          <h5>{results.data.order_items[i].name}</h5>
          <p>{results.data.order_items[i].description}</p>

        </td>
        <td>{results.data.order_items[i].quantity}</td>
        <td>${results.data.order_items[i].amount}</td>
        <td>${results.data.order_items[i].total}</td>
        
      </tr>
    })}
      
    </tbody>
  </Table>
      </div>


      <div className="totalBill">
        <Jumbotron style={{height:'280px'}}>
            <div className="subTotal">
<p>Sub Total: ${Number(results.data.order_items[0].total)+Number(results.data.order_items[1].total)+Number(results.data.order_items[2].total)}</p>
<p>Taxes(10%):${(Number(results.data.order_items[0].total)+Number(results.data.order_items[1].total)+Number(results.data.order_items[2].total))*0.1}</p>
<p>Dicount(5%):${((Number(results.data.order_items[0].total)+Number(results.data.order_items[1].total)+Number(results.data.order_items[2].total))+(Number(results.data.order_items[0].total)+Number(results.data.order_items[1].total)+Number(results.data.order_items[2].total))*0.1)*0.05}</p>
<div className="totalamount"><p>Total:${((Number(results.data.order_items[0].total)+Number(results.data.order_items[1].total)+Number(results.data.order_items[2].total))+(Number(results.data.order_items[0].total)+Number(results.data.order_items[1].total)+Number(results.data.order_items[2].total))*0.1)*0.95}</p>
</div>
</div>
        </Jumbotron>
      </div>
</Card>
      <div className="termsConditions">
        <h6>Terms And Conditions:</h6>
          <p> Release your code by whatever license you think isappropriate so I can use this code freely for any non-commercial purposes
          giving credit to you.
          </p>
      </div>

      <div className="printCancel">
        <>
        
          <Button variant="primary" onClick={() => this.handleClick(results)} style={{width:'50px'}}>Print</Button>{''}
         
          <Button variant="secondary">Cancel</Button>{' '}
          
      </>
      </div>


    </div>
     
      : <h1>loading...</h1>;
    
  }
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestApiData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);