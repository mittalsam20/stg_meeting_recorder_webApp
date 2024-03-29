//Packages
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const meta = require("ts-ebml");
const fetch = require("node-fetch");

//Intialization
const app = express();
// var corsOptions = {
//     origin: true,
//     Credentials: true
// }

// Server Middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Importing Routes
const Port = process.env.PORT || 5000;
const authRoute = require("./routes/auth");
const recRoute = require("./routes/recordingurl");
const noteRoute = require("./routes/noteurl");
const routerUrls = require("./routes/emailroute");
const recording = require("./models/recordingmodels");

//DB Connection
dotenv.config();
mongoose.connect(
  process.env.DATABASE_ACCESS,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  },
  () => console.log("Database Connected successfully..!!")
);

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

//Multer Portion
app.use("/app/recording", express.static("upload"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
  // limits: { fileSize: 1024 * 1024 * 5 }
});

// Upload API

app.post("/app/upload", upload.single("recording"), (req, res) => {
  const recording_url = `/recording/${req.file.filename}`;

  const newrecording = new recording({
    user: req.body.user,
    recordingFileName: req.file.filename,
    recordingPath: req.file.path,
    recordingUrl: recording_url,
    duration: req.body.duration,
  });
  newrecording
    .save()
    .then((data) => {
      res.status(200).json(data);
      fetch(`http://127.0.0.1:8080/ml/process/${data.id}`).then((res) =>
        res.text()
      );
    })
    .catch((error) => {
      res.status(500).json(error);
    });
  // res.status(200).json({
  //     success: 1,
  //     recording_url: recording_url,
  //     recodring_path:req.file.path
  // })
});

// })

//Calling Of All Routes
app.use("/app", routerUrls);
app.use("/app", authRoute);
app.use("/app", recRoute);
app.use("/app", noteRoute);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client_side/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client_side", "build", "index.html"));
//   });
// }

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page Not Found",
  });
});

//Server Listening At This Port
app.listen(Port, () => {
  console.log(`Server has started listening on Port ${Port}`);
});
