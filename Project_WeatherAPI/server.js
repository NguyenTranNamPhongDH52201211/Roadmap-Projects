import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app=express();// Khoi tao ung dung bang Express
const PORT= process.env.port ||3000; // Chay tren port 3000
const API_KEY= process.env.VISUAL_API_KEY; // lay key tu tai khoan dang ky tren web de xac thuc danh tinh

app.get("/weather",async (req, res)=>{ // app dieu huong den trang weather 
    const city=req.query.city;// ten city dc yeu cau xem thoi tiet

    if(!city){
        return res.status(400).json({error: 'Vui long nhap thanh pho (city)'});
    }

    try{
        const url=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_KEY}&unitGroup=metric`;
        // se lay tu trang web theo ten thanh pho roi dung key xac nhan va lay theo nhiet do C.
        const response= await axios.get(url); // Se chay bat dong bo vi du lieu co the lay lau hoac nhanh ( ko xac dinh dc khi nao xong)
        res.json(response.data); // Tra ve du lieu

    }catch(error){
        res.status(500).json({error:'Khong lay duoc thong tin thoi tiet'});
    }
});

app.listen(PORT,()=>{
      console.log(`Server chạy ở http://localhost:${PORT}`);
})