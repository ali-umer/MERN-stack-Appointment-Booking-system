const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const app = express()
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/WEBproject")

app.use(express.static(__dirname + '/public'));

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Assuming usernames should be unique
    },
    password: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: false
    },
    Age: {
        type: Number,
        required: false
    }

});


const ContactSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    }


});

const AppointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    doctorName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }


});


const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    study: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    waitTime: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    satisfiedPatients: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    additionalDescription: {
        type: String,
        required: true
    }
});

const HospitalSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    AdditionalDescription: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    TypesofDoctors: {
        type: String,
        required: true
    },


});


const UserModel = mongoose.model("users", UserSchema)
const ContactModel = mongoose.model("contact", ContactSchema)
const AppointmentModel = mongoose.model("appointments", AppointmentSchema);
const DoctorModel = mongoose.model("doctors", DoctorSchema);
const HospitalModel = mongoose.model("hospitals", HospitalSchema);


app.get("/getUsers", (req, res) => {
    UserModel.find({}).then(function (users) {
        res.json(users)
    }).catch(function (err) {
        console.log(err)
    })
})

app.get("/getDoctor", (req, res) => {
    DoctorModel.find({}).then(function (users) {
        res.json(users)
    }).catch(function (err) {
        console.log(err)
    })
})

app.post("/signup", async (req, res) => {
    try {
        // Check if user with the same name already exists
        let existingUser = await UserModel.findOne({ username: req.body.username })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user document
        const newUser = new UserModel({ username: req.body.username, password: req.body.password, Gender: req.body.Gender, Age: req.body.Age });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/bookAppointment", async (req, res) => {
    try {

        const newAppointment = new AppointmentModel({ name: req.body.name, doctorName: req.body.doctorName, date: req.body.date, time: req.body.time });

        // Save the new user to the database
        await newAppointment.save();

        res.status(201).json({ message: "Appointment booked successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



app.post("/login", async (req, res) => {

    if (req.body.password && req.body.username) {
        let user = await UserModel.findOne(req.body).select("-password")
        if (user) {
            res.send('Logged in')
        }

        else {
            res.send('No user found')
        }
    }
    else {
        res.send('username or password is empty')
    }

})


app.post("/contact", async (req, res) => {
    try {
        const contactEntry = new ContactModel({ username: req.body.username, message: req.body.message });
        await contactEntry.save();
        res.status(201).json({ message: "Entered Successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post('/getAppointments', async (req, res) => {
    const userName = req.body.name;

    AppointmentModel.find({ name: userName })
        .then(function (appointments) {
            res.json(appointments);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' }); // Sending an error response
        });
});


app.post('/deleteAppointment', async (req, res) => {
    const appointmentData = req.body;

    try {
        const deletedAppointment = await AppointmentModel.findOneAndDelete(appointmentData);
        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/updateAppointment', async (req, res) => {
    const { name, doctorName, date, time, newDate, newTime } = req.body;

    try {
        // Find the appointment based on provided data
        const appointment = await AppointmentModel.findOne({ name: name, doctorName: doctorName, date: date, time: time });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Update date and time fields with new values
        appointment.date = newDate;
        appointment.time = newTime;

        // Save the updated appointment
        await appointment.save();

        res.status(200).json({ message: 'Appointment updated successfully' });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/setAppointment', async (req, res) => {
    try {
        const appointmentEntry = new AppointmentModel({ name: req.body.name, doctorName: req.body.doctorName });
        await appointmentEntry.save();
        res.status(201).json({ message: "Entered Successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/getHospital", (req, res) => {

    HospitalModel.find({})
        .then(function (hospitals) {
            res.json(hospitals);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' }); // Sending an error response
        });
});


app.get('*', function (req, res) {
res.send("Invalid end point entered")

})


app.listen(3001, () => {
    console.log("server is running")
}) 