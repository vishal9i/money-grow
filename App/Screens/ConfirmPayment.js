import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";
import { BASE_URL } from "../../Config.json";

const ConfirmPayment = ({ route, navigation }) => {
  const { amount, orderid, phone, category, email, name } = route.params;
  // const [status, setstatus] = useState();
  const updateStatus = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(BASE_URL + "paid-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        userid: token,
      },
      body: JSON.stringify({
        status: true,
        category: category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success == true) {
          navigation.replace("App", { screen: "Home" });
        } else {
          alert(data.message);
        }
      });
  };
  const statushandler = (status) => {
    status.nativeEvent.data == "Success"
      ? updateStatus()
      : alert("Payment Failed");
  };

  console.log(amount, phone, orderid, email);
  const HTML = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>rezorpay</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <style>
        #container {
        
            height: 700px;
            background-color: rgb(248, 248, 248);
            text-align: center;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            position: relative;
          }
          
         
          
          #brand-image {
            display: block;
            height: 10%;
            width: 10%;
            margin: 0px auto;
            padding: 50px 0px;
          }
          
          .btn {
            padding: 1rem;
            margin: 5px auto;
            font-size: 1.5rem;
            width: 95%;
            box-sizing: border-box;
            border: none;
            border-radius: 10px;
          }
          #cancel-btn {
            position: absolute;
            bottom: 10px;
            left: 2.5%;
            background-color: #ebebe4;
          }
          
          #rzp-button1 {
            position: absolute;
            bottom: 80px;
            left: 2.5%;
            background-color: #f7931b;
          }
    </style>
    </head>
    
    <body>
    
    <div id="container" class="container">
    <img src="./M_Logo.png" alt="" id="brand-image" />
    <h1>Confirm your payment of Rs.${amount}</h1>
   
    <button class="btn" id="rzp-button1">Pay</button>
  </div>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        
        <script> 
        
            var options = {
                "key": "rzp_test_LY2A6hmgbH6qPn", // Enter the Key ID generated from the Dashboard
                "amount": "${amount}", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Money Grow",
                "description": "Secured Transaction",
                "image": "https://res.cloudinary.com/projects-9i/image/upload/v1630733454/operator_zh0uby.png",
                "order_id": "${orderid}", //This is a sample Order ID. Pass the obtained in the response of Step 1
                "handler": function (response) {
                    window.ReactNativeWebView.postMessage("Success")
                   
                    
                     
                },
                "prefill": {
                  "name":"${name}",
                  "email":"${email}",
                    "contact": "${phone}"
                    
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            
            var rzp1 = new Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
            document.getElementById('rzp-button1').onclick = function (e) {
                rzp1.open();
                e.preventDefault();
            }
        </script>
        
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
      </body>
    
    </body>
    
    </html>`;
  return (
    <WebView
      source={{ html: HTML }}
      onMessage={(event) => statushandler(event)}
    />
  );
};

export default ConfirmPayment;

const styles = StyleSheet.create({});
