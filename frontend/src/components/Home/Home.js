import React from 'react'
import NavigationBar from '../Navbar/Navbar'
import { Row, Col, Card, Form, Table, FormControl, Button} from 'react-bootstrap'
import { useState } from 'react';
import cameraIcon from '../../assets/camera_icon.png'
import axios from 'axios';

const Home = () => {
  const [phone,setPhone] = useState(1);
  const [items, setItems] = useState([
    {
      id: "1",
      item: "Pizza",
      amount: 200,
      category: "Food"
    }
  ])
  const[file,setFile] = useState();

  const [scannedData,setScannedData] = useState({amount:0, category:"", date:""});


function handleChange(e){
  setFile(e.target.files[0]);
}

function handleInputChange(key,e){
  const value = e.target.value;
  const newObj = {
    ...scannedData,
    [key]: value
  }
  setScannedData(newObj);
}

  function handleSubmit(e) {
    e.preventDefault();
    axios.get(`http://localhost:8000/extractData/path=${"12"}`)
    .then(result=>{
      // setItems(result.data);
      setScannedData(result.data);
      console.log(result.data);
    })
    .catch(e=>{
      console.log(e);
    })
    console.log(file);
  }

  function handleSaveTransaction(e){
    e.preventDefault();
    console.log(scannedData);
    const data = { 
      phoneNo: phone,
      walletTransaction: false,
      transactionAmount: scannedData.amount,
      transactionTimeStamp: "",
      transactionDescription: scannedData.merchant_name,
      transactionCategory: scannedData.category,
      transactionType: "DR"
    }
    console.log(scannedData);
    axios.post("http://localhost:8000/addTransaction/",JSON.stringify(data))
    .then(result=>{
      console.log(result);
    })
    .catch(e=>{
      console.log(e);
    })
  }
  // {"phoneNo":"8888888881", "walletTransaction": "false", "transactionAmount": "100", "transactionTimeStamp":"2019-11-11T11:11:11", "transactionDescription": "test", "transactionType": "CR", "transactionCategory": "FOOD"}

  // path('addTransaction/',     views.addTransaction, name="addTransaction"),

  return (
    <div>
      <NavigationBar />
      <Row className="justify-content-center">
        <Col lg={6} md={6}>
          <Card style={{ height: '70vh', margin: '30px', padding: '20px' }}>
            <Row><h3>Upload your bill image : </h3></Row>
            <div><img src={cameraIcon} height="120px" width="120px" style={{textAlign:"center"}} /></div>
            <Form onSubmit={handleSubmit}>
              <Row style={{height:'150px', margin:'20px'}} ><input type="file" onChange={handleChange}/></Row>
              <Row><Button type="submit" style={{height:'50px', width:'35%'}}>Submit</Button></Row>
              
              </Form>
          </Card>
        </Col>
        <Col lg={6} md={6}>
          <Card style={{ height: '70vh', margin: '30px', padding: '20px' }}>
            {/* <div>
              Sender/Reciever :
              <input type="text" style={{ margin: '10px', width: '50%' }} ></input>
            </div> */}
              <Form onSubmit={handleSaveTransaction}>
            <Table striped bordered hover size="sm">
              
              <tbody>
                {
                  
                  scannedData && Object.keys(scannedData)?.map((key) => (
                      <tr>
                        <td>
                          {key}
                          </td>
                        <td>
                          <Form.Control value={scannedData[key]} onChange={(e)=>handleInputChange(key,e)}/>
                        </td>
                      </tr>
                  ))
                }
              </tbody>
            </Table>
            <Button type="submit">Submit</Button>
              </Form>
          </Card>
        </Col>
      </Row>
    </div >
  )
}

export default Home
