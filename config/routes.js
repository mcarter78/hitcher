var express = require('express');
var app = require('../server');
var mongoose = require('mongoose');

//routes
app.get('users/new', usersController.new);


