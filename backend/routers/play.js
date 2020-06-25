const express = require('express');
const router = express.Router();
const mongo = require('../db');
const adcolName = 'audio';
let {formatData,Decrypt} = require('../utils');
//解密filekey，并返回