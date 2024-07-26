var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const dotenv = require('dotenv')
const database = require('./db')
const helmet = require('helmet')
var indexRouter = require('./routes/index')
var cors = require('cors')
dotenv.config()

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// use helmet 
app.use(helmet())

// set up cors
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'api')))
app.use("/api",express.static(path.join(__dirname, './api')))

app.use('/api', indexRouter)


app.use((req, res, next) => {
  console.log(app.patch);
  res.json({ success: false, msg: "no such route", url: `${req.method}  ${req.url}` });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
