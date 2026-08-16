//nodejs code here 
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/login2.html");
});

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect((err) =>
{
    if(err)
    {
        console.log(err);
        return;
    }

    console.log("Connected to MySQL");
});

app.post("/login",(req,res)=>
{
    const userid = req.body.userid;
    const password = req.body.password;

    const sql = "SELECT * FROM users2 WHERE userid=?";

    db.query(sql,[userid],(err,result)=>
    {
        if(err)
        {
            res.send("Database Error");
            return;
        }

        if(result.length==0)
        {
            res.send("User ID Not Found");
        }
        else
        {
            if(result[0].password == password)
            {
                res.json({
                 success: true,
                 usertype: result[0].usertype,
                userid: result[0].userid
                });
            }
            else
            {
                res.json({
                success: false,
                message: "Wrong Password"
                });
            }

        }
    });
});

app.post("/signup",(req,res)=>
{
    const usertype = req.body.usertype;
    const userid = req.body.userid;
    const password = req.body.password;

    const checksql = "SELECT * FROM users2 WHERE userid=?";

    db.query(checksql,[userid],(err,result)=>
    {
        if(err)
        {
            res.send("Database Error");
            return;
        }

        if(result.length>0)
        {
            res.send("User ID Already Exists");
        }
        else
        {
            const insertsql =
            "INSERT INTO users2(usertype,userid,password) VALUES(?,?,?)";

            db.query(insertsql,
            [usertype,userid,password],
            (err)=>
            {
                if(err)
                {
                    res.send("Database Error");
                    return;
                }

                res.send("Account Created Successfully");
            });
        }
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
{
    console.log(`Server Running on Port ${PORT}`);
});