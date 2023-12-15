const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const {api2}=require('./schema')



app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

const api={
    "currencies": {
    "TWD": {
    "TWD": 1,
    "JPY": 3.669,
    "USD": 0.03281
    },
    "JPY": {
    "TWD": 0.26956,
    "JPY": 1,
    "USD": 0.00885
    },
    "USD": {
    "TWD": 30.444,
    "JPY": 111.801,
    "USD": 1
    }
    }
    }



const reply={
    "msg":"wrong",
    "amount":"0"
}
app.get("/", (req, res) => {
    res.render("api")
    });

app.get("/GET",async (req, res) => {

    const { error } = await api2.validate(req.query);
    if (error) {
        
        reply.amount="格式輸入錯誤"
        reply.msg="格式輸入錯誤"
        return res.send(reply) 
        } 
        let {source}=req.query;
        let {target}=req.query;
        let {amount}=req.query;
        let msg = "wrong";
        let rate= 0;
        
        if ((source in api.currencies)&&(target in api.currencies )) {
           
            msg="success"     
            target=api.currencies[`${source}`][`${target}`] 
            rate=target
            amount=amount*rate
            amount=Math.round( amount*100)/100
            amount=(amount).toLocaleString()
        }else{
            msg="wrong";
            amount="無法換算"
        }
        reply.msg=msg
        reply.amount=amount
        res.send(reply) 
        });

        


app.listen(3000, ()=>{
    console.log("the app is running on localhost:3000");
    })
   


