var express = require('express');
var router = express.Router();
var artistasModel = require('./../models/artistasModel');
var generosModel = require('./../models/generosModel');
var lanzamientosModel = require('./../models/lanzamientos');
var cloudinary = require('cloudinary').v2;
var mapeadorImagenes = require('./../models/mappearImagenes');
var mapeadorAudios = require('./../models/mappearAudios');

// all artistas
router.get('/artistas',async function (req,res,next) {
    var artistas = await artistasModel.getAllArtistas();

    artistas = mapeadorImagenes.mapeoFront(artistas);

    res.json(artistas)

});

//top 3 artistas
router.get('/artistasTop',async function (req,res,next) {
    var artistas = await artistasModel.getTop3Artistas();

    artistas = mapeadorImagenes.mapeoFront(artistas);

    res.json(artistas)

});

//all lanzamientos
router.get('/lanzamientos',async function (req,res,next) {
    var lanzamientos = await lanzamientosModel.getAllLanzamientos();

    lanzamientos = mapeadorImagenes.mapeoFront(lanzamientos);
    lanzamientos = mapeadorAudios.mapeoFront(lanzamientos);

    res.json(lanzamientos)

});

//top lanzamientos
router.get('/lanzamientosTop',async function (req,res,next) {
    var lanzamientos = await lanzamientosModel.getTop3Lanzamientos();

    lanzamientos = mapeadorImagenes.mapeoFront(lanzamientos);
    lanzamientos = mapeadorAudios.mapeoFront(lanzamientos);

    res.json(lanzamientos)

});

//all generos
router.get('/generos',async function (req,res,next) {
    var generos = await generosModel.getAllGeneros();

    generos = mapeadorImagenes.mapeoFront(generos);

    res.json(generos)

});

module.exports = router