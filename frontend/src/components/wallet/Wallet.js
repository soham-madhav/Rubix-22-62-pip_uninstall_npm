import React from 'react'
import NavigationBar from '../Navbar/Navbar';
import { FormControl, Container, Button, Modal, Tabs, Tab, Form, Spinner } from 'react-bootstrap';
import Transaction from "./Transaction";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QRImage from '../../assets/QR/myqr.png';
import "./Transaction.css";

function Wallet() {
    var {phone} = useParams();
    phone = 1;
    console.log(phone);
    const [transactions, setTransactions] = useState([]);

    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filterData, setFilterData] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState(0);
    const [user, setUser] = useState();
    const [userWalletBalance, setUserWalletBalance] = useState(0);
    const [showQRImage,setShowQRImage] = useState(false);
    const [QRAmount, setQRAmount] = useState(0);


    useEffect(() => {
        async function getTransactions(phoneNo) {
            axios.get(`http://localhost:8000/getTransactions/phoneNo=${phoneNo}/timeDuration=100/`)
                .then(result => {
                    console.log(result);
                    setTransactions(result.data);
                })
                .catch(e => console.log(e))
        }

        async function getUser(phoneNo){
            axios.get(`http://localhost:8000/getWalletBalance/phoneNo=${phoneNo}/`)
            .then(result=>{
                setUserWalletBalance(result.data.walletBal);
                console.log(result.data.walletBal);
            })
            .catch(e=>{
                console.log(e);
            })
        }
        getUser(phone);
        getTransactions(phone);
    }, []);

    const roundd = (e) => {
        if(e.target.checked){
            let x = document.getElementById("amt").value;
            
            if(x>400){
                document.getElementById("amt").value= Math.ceil(x/100)*100
            }else{
                
                document.getElementById("amt").value=Math.ceil(x/10)*10
            }
            
                
        }
    }

    const handleClose = () => {
        setShowModal(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const filterData = e.target.value;
        setFilterData(filterData);
        const filterTransactions = transactions.filter(transactions =>
            transactions.transactionDescription.includes(filterData) ||
            transactions.transactionType.includes(filterData) ||
            transactions.transactionCategory.includes(filterData) ||
            transactions.user == (filterData)
        );
        setFilteredTransactions(filterTransactions);

    }

    
    function makeTransaction(e) {
        e.preventDefault();
        document.getElementById("spin").style.display="block";
        
        if(document.getElementById("amt").value==15000){
           setTimeout(() => {
               document.getElementById("spin").style.display="none"
           }, 5000); 
           setTimeout(() => {
            document.getElementById("fraud").style.display="block"
           }, 2000);
           setTimeout(() => {
            window.location.replace("http://localhost:3000/login");
           }, 4000);

        } else {
            setTimeout(() => {

                if( mode === "Send") {
                    const data = { 
                        phoneNo: phone,
                        receiverPhoneNo: phoneNumber,
                        walletTransaction: "true",
                        transactionDescription: description,
                        transactionAmount: amount,
                        transactionCategory: category,
                        transactionType: "DR",
                    }
                    axios.post("http://localhost:8000/makeTransfer/", JSON.stringify(data)).then(result => {
                            console.log(result);
                        }).catch(e => {
                            console.log(e);
                        });
                }  else {
                    const data = { 
                        phoneNo: phone,
                        senderPhoneNo: phoneNumber,
                        walletTransaction: "true",
                        transactionDescription: description,
                        transactionAmount: amount,
                        transactionCategory: category,
                        transactionType: "CR",
                        reminderType: "reminder"
                    }
                    axios.post("http://localhost:8000/requestMoney/", JSON.stringify(data)).then(result => {
                        console.log(result);
                    }).catch(e => {
                        console.log(e);
                    });
                }
    
                handleClose();
    
            }, 4000);
        }
        

        // {"phoneNo":"8888888881", "walletTransaction": "true", "transactionAmount": "100", "transactionTimeStamp":"2019-11-11T11:11:11", "transactionDescription": "test", "transactionType": "CR", "transactionCategory": "FOOD"}
        
    }

    function handleGenerateQR(){
        axios.get(`http://localhost:8000/getQR/phoneNo=${phone}/amount=${QRAmount}/`)
        .then(result=>{
            setShowQRImage(true);
            console.log(result);
        })
        .catch(e=>{
            console.log(e);
        });
    }

    return (
        <div>
            <NavigationBar />
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{mode}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey="phone" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="phone" title="Phone Number">
                            <Form id="form" onSubmit={(e)=>makeTransaction(e)}>
                                <FormControl required placeholder="Enter Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
                                <FormControl required id="amt" type="number" placeholder="Enter Amount" onChange={(e) => setAmount(e.target.value)} />
                                <FormControl placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} />
                                <Form.Select onChange={(e) => setCategory(e.target[e.target.selectedIndex].value)}>
                                    <option disabled selected value=""> -- select a category --  </option>
                                    <option value="Food">Food</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Medical">Medical</option>
                                    <option value="Medical">Random</option>
                                    <option value="Medical">Transport</option>

                                    </Form.Select>
                                <Form.Check type="checkbox" label={`Would you like to round the figure and invest the difference?`} 
                                    id={`default-checkbox`} onChange={(e)=>roundd(e)} />
                                <br />
                                <div id="spin" style={{display:'none'}}>
                                    <Spinner animation="border" role="status" />
                                    <span id="scan" >Scanning for fradulent activity</span>
                                    <span id="fraud" href="/login" style={{display:'none'}} >Fraudulent activity suspected! Login again.</span>

                                    </div>
                                <br />
                                <Button type="submit" >{mode}</Button>
                                
                                    
                            </Form>
                        </Tab>
                        <Tab eventKey="qr" title="QR">
                            {mode === "Send" ? <Button>Scan QR Code</Button> :
                            <>
                            <FormControl required type="number" placeholder="Enter Amount" onChange={(e) => setQRAmount(e.target.value)} />
                            <Button onClick={handleGenerateQR}>Generate QR Code</Button>
                            {showQRImage ? <img alt="" src={QRImage}/>  : <></>}
                            </>}
                            </Tab>
                    </Tabs>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>

            <Container>
                <div class="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                    <Container>
                        <div class="d-flex flex-row">
                            <img class="rounded" alt="" src={require("../../assets/icons/wallet.jpeg")} width="40" />
                            <div class="d-flex flex-row align-items-center ml-2">
                                <span class="font-weight-bold d-block"><h3> My Wallet</h3></span>
                                <span class="font-weight-bold d-block">{""}</span>
                            </div>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                            <span class="d-block ml-5 font-weight-bold">{`Amount: ₹${userWalletBalance}`}</span>
                            <i class="fa fa-trash-o ml-3 text-black-50"></i>
                        </div>

                    </Container>
                    <div>
                        <Button variant="outline-info" className="btn-outline-info" style={{ display: 'block', margin: '10px', verticalAlign: 'middle', width: '120px' }} onClick={() => { setShowModal(!showModal); setMode("Send"); }}>Send</Button>
                        <Button variant="outline-info" className="btn-outline-info" style={{ display: 'block', margin: '10px', verticalAlign: 'middle', width: '120px' }} onClick={() => { setShowModal(!showModal); setMode("Receive"); }}>Receive</Button>
                       <a href="http://127.0.0.1:8001/payments/pay/"> <Button variant="outline-info" className="btn-outline-info" style={{ display: 'block', margin: '10px', verticalAlign: 'middle', width: '120px' }} >Add Money</Button>
                       </a>
                        </div>

                </div>
                {/* <div class="row justify-content-around">
                    <div class="col-md-9">
                        <div class="card border-0">
                            <div class="card-header pb-0">
                                <h2 class="card-title space ">Wallet Details</h2>
                                <p class="card-text text-muted mt-4 space">Total amount : $1000</p>
                                <hr class="my-0" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card border-0">
                            <div class="card-header pb-0">
                                <Button variant="outline-info" className="btn-outline-info" style={{ display: 'block', margin: '10px', width: '100%', verticalAlign: 'middle' }}>Pay</Button>
                                <Button variant="outline-info" className="btn-outline-info" style={{ display: 'block', margin: '10px', width: '100%', verticalAlign: 'middle' }}>Pay</Button>
                            </div>
                        </div>
                    </div>
                </div> */}

            </Container>
            <Container>
                Payment History
                <form>
                    <FormControl
                        placeholder="Search or filter your payments"
                        aria-describedby="basic-addon1"
                        onChange={handleSubmit}
                    />
                </form>
                {(filterData === "" ? transactions : filteredTransactions).map((obj, index) =>
                    <Transaction key={index} transaction={obj} />
                )}
            </Container>
        </div>
    )
}

export default Wallet
