import React from 'react'
import "./Transaction.css";
import foodIcon from "../../assets/icons/food.jpeg";
import entertainmentIcon from "../../assets/icons/entertainment.jpeg";
import medicalIcon from "../../assets/icons/medical.jpeg";

function Transaction(props) {
    const { transaction } = props;

    const getImage = (type) => {
        if (type.toLowerCase() === "food") {
            return foodIcon
        }
        else if (type.toLowerCase() === "entertainment") {
            return entertainmentIcon
        }
        else if (type.toLowerCase() === "medical") {
            return medicalIcon
        }
    }

    const dateTime = transaction.transactionTimeStamp.split("T");

    return (
        <div class="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
            <div class="d-flex flex-row">
                <img class="rounded" alt="" src={getImage(transaction.transactionCategory)} width="40" />
                <div class="ml-2">
                    <span class="font-weight-bold d-block">{transaction.transactionDescription}</span>
                    <span class="spec">To:{transaction.receiverPhoneNo}, {`Description: ${transaction.transactionDescription}\tDate: ${dateTime[0]}\tTime: ${dateTime[1]}`}</span>
                </div>
            </div>
            <div class="d-flex flex-row align-items-center">
                <span class="d-block">{transaction.walletTransaction ? "Wallet" : "Non Wallet"}</span>
                <span class="d-block ml-5 font-weight-bold">{transaction.transactionType === "CR" ? `+₹${transaction.transactionAmount}` : `-₹${transaction.transactionAmount}`}</span>
                <i class="fa fa-trash-o ml-3 text-black-50"></i>
            </div>
        </div>
    )
}

export default Transaction