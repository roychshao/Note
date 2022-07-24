import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { pool } from "./db_interact/db_pool.js";
const app = express();


// Routes
import itemRouter from "./routes/item.js";

//設定express
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

//設定跨域
app.use(cors());

//將每個request寫到access.log
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

//獲取靜態檔案
app.use(express.static(path.join(__dirname,"./../frontend","build")))

//設定localhost port
const PORT = 3002;
app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))

//設定request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTES
app.use('/item', itemRouter);

//測試server在線
app.get('/', (req, res) => {
    const response = {
        "success": true,
        "message": "hello from Note",
        "data": {}
    };
    res.status(201).json(response);
})
