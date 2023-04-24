var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload')

var session = require('express-session')

require('dotenv').config();

var session = require('express-session');

var indexRouter = require('./routes/index');

var loginAdminRouter = require('./routes/admin/login')
var adminRouter = require('./routes/admin/home');
var loginUsersRouter = require('./routes/users/login')
var usersRouter = require('./routes/users/home')

var adminGenerosRouter = require('./routes/admin/generos');
var adminLanzamientosRouter = require('./routes/admin/lanzamientos');
var adminArtistasRouter = require('./routes/admin/artistas');
var adminContactoRouter = require('./routes/admin/contacto');

var usersGenerosRouter = require('./routes/users/generos');
var usersLanzamientosRouter = require('./routes/users/lanzamientos');
var usersArtistasRouter = require('./routes/users/artistas');
var usersContactoRouter = require('./routes/users/contacto');

var artistaModel = require('./models/artistasModel')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("images"));

app.use(session({
  secret: 'bwST3zw6BP4baHDHtL78',
  resave:false,
  saveUninitialized:true
}))

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

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
      res.redirect('/users/login')
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
      res.redirect('/users/login')
    }
  }
  catch(error){
    console.log(error)
  }
}

app.get("/static", (req, res) => {
  res.render("static");
});

app.use('/', indexRouter);


app.use('/admin/login', loginAdminRouter);
app.use('/admin/home', securedAdmin , adminRouter);
app.use('/admin/lanzamientos', securedAdmin , adminLanzamientosRouter);
app.use('/admin/generos', securedAdmin , adminGenerosRouter);
app.use('/admin/artistas', securedAdmin , adminArtistasRouter);
app.use('/admin/contacto', securedAdmin , adminContactoRouter);


app.use('/users/login', loginUsersRouter);
app.use('/users/home', securedUsers , usersRouter);
app.use('/users/lanzamientos', securedUsers , usersLanzamientosRouter);
app.use('/users/generos', securedUsers , usersGenerosRouter);
app.use('/users/artistas', securedUsers , usersArtistasRouter);
app.use('/users/contacto', securedUsers , usersContactoRouter);

/*
var resultado =  artistaModel.insertArtista('nombrePrueba','descripcionprueba');
var resultado2 =  artistaModel.insertArtista('nombrePrueba2','descripcionPrueba2','imagenPrueba.jpg')
*/





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
