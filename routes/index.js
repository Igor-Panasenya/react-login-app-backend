const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const backgroundRouter = require('./backgroundRouter');

router.use('/user', userRouter);
router.use('/background', backgroundRouter);

module.exports = router