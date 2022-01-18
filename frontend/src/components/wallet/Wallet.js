import React from 'react'
import NavigationBar from '../Navbar/Navbar';
import { FormControl, Container, Button, Modal, Tabs, Tab, Form } from 'react-bootstrap';
import Transaction from "./Transaction";
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./Transaction.css";

function Wallet() {
    const [transactions, setTransactions] = useState([
        {
            "id": 1,
            "walletTransaction": true,
            "transactionAmount": 100.0,
            "transactionTimeStamp": "2022-01-18T06:40:15.010850Z",
            "transactionDescription": "rest",
            "transactionType": "CR",
            "transactionCategory": "food",
            "user": 29
        },
        {
            "id": 2,
            "walletTransaction": true,
            "transactionAmount": 100.0,
            "transactionTimeStamp": "2022-01-18T06:40:59.506805Z",
            "transactionDescription": "test",
            "transactionType": "CR",
            "transactionCategory": "entertainment",
            "user": 29
        },
    ]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filterData, setFilterData] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState(0);
    const [user, setUser] = useState();

    useEffect(() => {
        async function getTransactions(phoneNo) {
            axios.get(`http://localhost:8000/getTransactions/${phoneNo}`)
                .then(result => setTransactions(result))
                .catch(e => console.log(e))
        }
        getTransactions();
    }, []);

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

    const handleClose = () => {
        setShowModal(false);
    }

    function makeTransaction(e) {
        e.preventDefault();
        const date = new Date();
        const data = { sender: "", receiver: phoneNumber, description, amount, category, date };//change sender to user.phonenumber
        console.log(data);
        axios.post("http://localhost:8000/something", data).then(result => {//change something to route
            console.log(result);
        }).catch(e => {
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
                            <Form onSubmit={makeTransaction}>
                                <FormControl required placeholder="Enter Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
                                <FormControl required type="number" placeholder="Enter Amount" onChange={(e) => setAmount(e.target.value)} />
                                <FormControl placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} />
                                <Form.Select onChange={(e) => setCategory(e.target[e.target.selectedIndex])}>
                                    <option disabled selected value=""> -- select a category --  </option>
                                    <option value="Food">Food</option>
                                    <option value="">Entertainment</option>
                                    <option value="">Medical</option>
                                </Form.Select>
                                <Button type="submit">{mode}</Button>
                            </Form>
                        </Tab>
                        <Tab eventKey="qr" title="QR">
                            {mode === "Send" ? <Button>Scan QR Code</Button> : <Button>Generate QR Code</Button>}
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
                            <img class="rounded" src={require("../../assets/icons/wallet.jpeg")} width="40" />
                            <div class="d-flex flex-row align-items-center ml-2">
                                <span class="font-weight-bold d-block">My Wallet</span>
                                <span class="font-weight-bold d-block">{""}</span>
                            </div>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                            <span class="d-block ml-5 font-weight-bold">{`Amount: ₹1000`}</span>
                            <i class="fa fa-trash-o ml-3 text-black-50"></i>
                        </div>

                    </Container>
                    <div>
                        <Button variant="outline-info" className="btn-outline-info" style={{ display: 'block', margin: '10px', verticalAlign: 'middle', width: '100px' }} onClick={() => { setShowModal(!showModal); setMode("Send"); }}>Send</Button>
                        <Button variant="outline-info" className="btn-outline-info" style={{ display: 'block', margin: '10px', verticalAlign: 'middle', width: '100px' }} onClick={() => { setShowModal(!showModal); setMode("Receive"); }}>Receive</Button>
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
