//dependacies

const express=require('express')
const app=express()
const mysql=require('mysql')
const cors=require('cors')


app.use(express.json())
app.use(cors())
// server


app.listen(3007, () => {
    console.log("App is listening on port");
  });

//   dbset
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "safespaceke",
  });

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL database: ", err);
      return;
    }
    console.log("Connected to MySQL database");
  });



//   routetoserver
// ...

app.get("/", (req, res) => {
    res.send("Success Message");
});

app.post('/createcase', (req, res) => {
    const { name, gender, phoneNumber, location, incidentDescription ,idNumber} = req.body;

  db.query(
    'INSERT INTO reportedcase (FullNames, IDNumber, PhoneNumber, location, Incidentdesc,Gender ) VALUES (?, ?, ?, ?, ?,?)',
    [name, idNumber , phoneNumber, location, incidentDescription,gender],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Values inserted');
      }
    }
  );
})