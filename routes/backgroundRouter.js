const Router = require('express');
const router = new Router();
const backgroundController = require('../controllers/backgroundController');

router.post('/', backgroundController.create)
router.get('/', backgroundController.getAll)

module.exports = router