var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session')

require('dotenv').config();
//var pool = require('./models/bd')

var session = require('express-session');

var indexRouter = require('./routes/index');
var loginAdminRouter = require('./routes/admin/login')
var adminRouter = require('./routes/admin/home');
var loginUsersRouter = require('./routes/users/login')
var usersRouter = require('./routes/users/home')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'bwST3zw6BP4baHDHtL78',
  resave:false,
  saveUninitialized:true
}))

securedAdmin = async (req,res,next)=>{
  try{
    console.log(req.session.id_usuario);
    if(req.session.id_usuario){
      if(req.session.admin){
        next();
      }
      else{
        res.redirect('/users/home')
      }
    }
    else{
      res.redirect('/')
    }
  }
  catch(error){
    console.log(error)
  }
}

securedUsers = async (req,res,next)=>{
  try{
    console.log(req.session.id_usuario);
    if(req.session.id_usuario){
      if(!req.session.admin){
        next();
      }
      else{
        res.redirect('/admin/home')
      }
    }
    else{
      res.redirect('/')
    }
  }
  catch(error){
    console.log(error)
  }
}

app.use('/', indexRouter);
app.use('/admin/login', loginAdminRouter);
app.use('/admin/home', securedAdmin , adminRouter);


app.use('/users/login', loginUsersRouter);
app.use('/users/home', securedUsers , usersRouter);




/*app.post('/ingresar', function(req, res, next) {
  if (req.body.nombre){
      req.session.nombre = req.body.nombre
  }
  res.redirect('/');
});*/


/*
app.get('/salir',function(req, res) {
  req.session.destroy();
  res.redirect('/');
});*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
