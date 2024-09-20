const express = require('express');
const multer = require('multer');
const { importTasks, exportTasks } = require('../controllers/taskController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/import', upload.single('file'), importTasks);
router.get('/export', exportTasks);

module.exports = router;
