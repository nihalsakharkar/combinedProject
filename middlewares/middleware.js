const multer = require('multer');



// to store data at particular location
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Folder to store uploaded files
    },
    // filename: function (req, file, cb) {
    //   cb(null, Date.now() + '-' + file.originalname);
    // },
    filename: (req, file, cb) => {
      const fileName = req.body.name; // Use the 'name' provided in the request body
      //const fileExtension = path.extname(file.originalname);
      const finalFileName = `${Date.now()}${ fileName}${file.originalname}`;
      cb(null, finalFileName);
    },
  });
const upload = multer({ storage: storage });

module.exports = upload;

