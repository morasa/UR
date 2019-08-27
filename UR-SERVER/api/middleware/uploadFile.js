import multer from "multer";

let storage = multer.diskStorage({
    destination: 'assets/uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ '.jpg')
    }
})

export const upload = multer({ storage: storage });
