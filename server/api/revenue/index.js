'use strict';

var express = require('express');
var controller = require('./revenue.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/',auth.isAuthenticated(), controller.index);
router.get('/recents',auth.isAuthenticated(), controller.recents);
router.get('/:id',auth.isAuthenticated(), controller.show);
router.post('/',auth.isAuthenticated(), controller.create);
router.put('/:id',auth.isAuthenticated(), controller.update);
router.patch('/:id',auth.isAuthenticated(), controller.update);
router.delete('/:id',auth.isAuthenticated(), controller.destroy);


router.post('/:id/documents',auth.isAuthenticated(), controller.documentUpload);
router.delete('/:id/documents/:documentId',auth.isAuthenticated(), controller.documentDelete);

module.exports = router;
