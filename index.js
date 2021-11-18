require('dotenv').config()
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const helmet = require("helmet");
const cors = require('cors')

const routes = require('./src/routes')
require('./src/helpers/Crons')

const app = express()
app.use(compression())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(routes)

const server = require('http').createServer(app)

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected: '+socket.id);

  socket.on('timer', data => {
    console.log(data)
  })

});

app.get("*", function (request, response) {
  response.status(200).json({ msg: "What's up!" });   
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server started at port: ${process.env.PORT}`)
})
