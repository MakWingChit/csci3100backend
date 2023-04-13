import express from "express";
import mysql from "mysql";
import cors from "cors";
const app= express()
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "thecs.cnpgvo2q9wqm.us-east-1.rds.amazonaws.com",
    port     : '3306',
    password: "csci3100",
    database: "thecs",
});

//just to make sure:
app.get("/", (req, res) =>{
    res.json("Hello, this is the backend")
});

//Admin CBP:
app.delete("/deleteCourse/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM course WHERE courseID = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.get("/course", (req, res) => {
    db.query("SELECT * FROM course ORDER BY courseID ASC", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.get("/courseByID", (req, res) => {
    const keyword = req.query.keyword;
    db.query("SELECT * FROM course WHERE courseID LIKE ? ORDER BY courseID ASC",
        [`%${keyword}%`],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});
app.post("/course/insert", (req, res) => {
    const courseID = req.body.courseID;
    const name = req.body.name;
    const time = req.body.time;
    const location = req.body.location;
    const department = req.body.department;
    const instructor = req.body.instructor;
    const capacity = req.body.capacity;
    db.query(
        "INSERT INTO course (courseID, name, time, location, department, instructor, capacity) VALUES (?,?,?,?,?,?,?)",
        [courseID, name, time, location, department, instructor, capacity],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});
app.put("/updateCourseName", (req, res) => {
    const courseID = req.body.courseID;
    const name = req.body.name;
    db.query(
        "UPDATE course SET name = ? WHERE courseID = ?",
        [name, courseID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
app.put("/updateTime", (req, res) => {
    const courseID = req.body.courseID;
    const time = req.body.time;
    db.query(
        "UPDATE course SET time = ? WHERE courseID = ?",
        [time, courseID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
app.put("/updateLocation", (req, res) => {
    const courseID = req.body.courseID;
    const location = req.body.location;
    db.query(
        "UPDATE course SET location = ? WHERE courseID = ?",
        [location, courseID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
app.put("/updateDepartment", (req, res) => {
    const courseID = req.body.courseID;
    const department = req.body.department;
    db.query(
        "UPDATE course SET department = ? WHERE courseID = ?",
        [department, courseID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
app.put("/updateInstructor", (req, res) => {
    const courseID = req.body.courseID;
    const instructor = req.body.instructor;
    db.query(
        "UPDATE course SET instructor = ? WHERE courseID = ?",
        [instructor, courseID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
app.put("/updateCapacity", (req, res) => {
    const courseID = req.body.courseID;
    const capacity = req.body.capacity;
    db.query(
        "UPDATE course SET capacity = ? WHERE courseID = ?",
        [capacity, courseID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
//Admin Profile
app.post("/createuser", (req, res) => {
    const userID = req.body.userID;
    const password = req.body.password;
    const name = req.body.name;
    const studyYear = req.body.studyYear;
    const major = req.body.major;
    const age = req.body.age;

    db.query(
        "INSERT INTO user (userID, password, name, studyYear, major, age) VALUES (?,?,?,?,?,?)",
        [userID, password, name, studyYear, major, age],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.get("/user", (req, res) => {
    db.query("SELECT * FROM user ORDER BY userID ASC", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.get("/userByID", (req, res) => {
    const keyword = req.query.keyword;
    db.query("SELECT * FROM user WHERE userID LIKE ? ORDER BY userID ASC",
        [`%${keyword}%`],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});
app.get('/userLogin', (req, res) => {
    const { userID, password } = req.query;

    // Retrieve user information from MySQL database
    const queryString = 'SELECT * FROM users WHERE userID = ?';
    db.query(queryString, [userID], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else if (results.length === 0) {
            res.status(401).send('User not found');
        } else if (results[0].password !== password) {
            res.status(401).send('Invalid password');
        } else {
            res.status(200).send('Login successful');
        }
    });
});
app.put("/updatepassword", (req, res) => {
    const userID = req.body.userID;
    const password = req.body.password;
    db.query(
        "UPDATE user SET password = ? WHERE userID = ?",
        [password, userID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
app.put("/updatename", (req, res) => {
    const userID = req.body.userID;
    const name = req.body.name;
    db.query(
        "UPDATE user SET name = ? WHERE userID = ?",
        [name, userID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
app.put("/updateyear", (req, res) => {
    const userID = req.body.userID;
    const studyYear = req.body.studyYear;
    db.query(
        "UPDATE user SET studyYear = ? WHERE userID = ?",
        [studyYear, userID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
app.put("/updatemajor", (req, res) => {
    const userID = req.body.userID;
    const major = req.body.major;
    db.query(
        "UPDATE user SET major = ? WHERE userID = ?",
        [major, userID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
app.put("/updateage", (req, res) => {
    const userID = req.body.userID;
    const age = req.body.age;
    db.query(
        "UPDATE user SET age = ? WHERE userID = ?",
        [age, userID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
app.put("/incap", (req, res) => {
    const userID = req.body.userID;
    db.query("UPDATE course SET course.capacity = course.capacity + 1 WHERE EXISTS ( SELECT DISTINCT reg.courseID FROM user, reg WHERE reg.userID = user.userID AND course.courseID = reg.courseID AND user.userID = ?)", userID, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.delete("/deleteuser/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM user WHERE userID = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.listen(8800, ()=>{
    console.log("Connected to backend!")
})