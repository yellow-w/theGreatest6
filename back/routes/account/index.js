const express = require('express');
const router = express.Router();
const accountMngRouter = require('./management');
const memberRouter = require('./member');

router.use('/member', memberRouter);
router.use('/management', accountMngRouter);



module.exports = router;