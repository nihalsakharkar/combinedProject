const { validationResult, check } = require('express-validator');

const createUserValidation = [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email does not exist').notEmpty().isEmail(),
    check('number', 'Number is required').notEmpty().isMobilePhone().isLength({ min: 10, max: 10 }),
    check('date', 'Date is required').notEmpty(),
    check('role', 'Role is required').notEmpty(),
    check('link', 'Link is required').notEmpty().isURL()
    
  ];

  module.exports = createUserValidation;

