

const { body, validationResult } = require('express-validator');

const attendanceValidation = [
  body('userid').exists().notEmpty().isMongoId().withMessage('Invalid userid'),
  body('date').exists().notEmpty().isDate().withMessage('Invalid date'),
  body('inTimeHours').exists().notEmpty().isInt().withMessage('Invalid inTimeHours'),
  body('inTimeMinutes').exists().notEmpty().isInt().withMessage('Invalid inTimeMinutes'),
  body('outTimeHours').exists().notEmpty().isInt().withMessage('Invalid outTimeHours'),
  body('outTimeMinutes').exists().notEmpty().isInt().withMessage('Invalid outTimeMinutes'),
];

const validateAttendance = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = { attendanceValidation, validateAttendance };



