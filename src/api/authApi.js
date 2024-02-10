const express = require('express');
const {
  checkDuplicateEmailOfUser,
} = require('../middlewares/verfiySignUp');
const { signup, signin } = require('../controllers/auth.controller');
const { signupSchema, loginSchema } = require('../validations');
const { zodErrorHandle } = require('../helpers/errorHandle');
const router = express.Router();

router.post(
  '/register',
  [
    checkDuplicateEmailOfUser,
    zodErrorHandle(signupSchema),
  ],
  signup,
);
router.post('/login', zodErrorHandle(loginSchema), signin);

module.exports = router;
