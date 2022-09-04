const controller = require("../controller/main.controller");

const router = require('express').Router();

router.get('/get/balance_sheet', controller.getBalanceSheet);
router.post('/post/decision', controller.getBalanceSheet);

module.exports = router;