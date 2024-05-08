//dependacies

const express=require('express')
const app=express()
const mysql=require('mysql')
const cors=require('cors')
const bodyParser = require("body-parser");
// const mysql = require("mysql2");



// bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const UssdMenu = require("ussd-builder");

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


let menu = new UssdMenu();

let dataToSave = {};

const atCredentials = {
  apiKey: "f67d02820dd41de9ff407657b1b307dbf65f044bd3810f4b8ca3357a89e5f0d0",
  username: "jeezz",
};

const AfricasTalking = require("africastalking")(atCredentials);

const sms = AfricasTalking.SMS;

menu.startState({
    run:()=>{
        menu.con(
            "Welcome to SafeSpaceKE"+
            "\n1. Report An Incident " +
           "\n2. Quit " 
           
        );
      },
      next:{
        1: "Report An Incident",
        2: "Quit ",
      },

    }
);

menu.state("Report An Incident", {
  run: () => {
    menu.con("  Enter your name?");
  },
  next: {
    "*[a-zA-Z]+": "name",
  },
});

menu.state("name", {
  run: () => {
      let phoneNumber = menu.args.phoneNumber;
        dataToSave.phoneNumber = phoneNumber;
    let name = menu.val;
    dataToSave.name = name;
    console.log(dataToSave);

    menu.con("Enter ID_Number");
  },

  next: {
    // using regex to match user input to net state

    "*[a-zA-Z]+": "ID_Number",
  },
});

menu.state("ID_Number", {
  run: async () => {
    let ID_Number = menu.val;
    dataToSave.ID_Number = ID_Number;
    console.log(dataToSave);

    menu.con("Gender ");
  },
  next: {
    "*[a-zA-Z]+": "Gender",
  },
});


menu.state("Gender", {
  run: async () => {
    let Gender = menu.val;
    dataToSave.Gender = Gender;
    console.log(dataToSave);

    menu.con("Incident_location ");
  },
  next: {
    "*[a-zA-Z]+": "Incident_location",
  },
});


menu.state("Incident_location", {
  run: async () => {
    let Incident_location = menu.val;
    dataToSave.Incident_location = Incident_location;
    console.log(dataToSave);

    menu.con("Incident_descprition ");
  },
  next: {
    "*[a-zA-Z]+": "Incident_descprition",
  },
});


menu.state("Incident_descprition", {
  run: async () => {
    let Incident_descprition = menu.val;
    dataToSave.Incident_descprition = Incident_descprition;

    // Save the data to the MySQL database
    const sql ='INSERT INTO reportedcase (FullNames, IDNumber, PhoneNumber, location, Incidentdesc,Gender ) VALUES (?, ?, ?, ?, ?,?)'
    
    const values = [dataToSave.name,dataToSave.ID_Number, dataToSave.phoneNumber, dataToSave.Incident_location,dataToSave.Incident_descprition, dataToSave.Gender ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error saving data to database:", err);
      } else {
        console.log("Data saved to database. Insert ID:", result.insertId);
      }
    });
    const options = {
      to: menu.args.phoneNumber,
      message: `Hi ${dataToSave.name},  Thank you for reporting the incident. Visit our page safespaceke.com To stay updated.`,
    };
    //sms.send(options).then(console.log).catch(console.log);

    await sms
      .send(options)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    menu.end("Safespaceke where one feels secure ");
  },
});

app.post("/ussd", (req, res) => {
  menu.run(req.body, (ussdResult) => {
    res.send(ussdResult);
  });
});