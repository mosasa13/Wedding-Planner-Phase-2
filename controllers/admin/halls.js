// controllers/admin/halls.js
import Hall from "../../models/Hall.js";

const halls_get_handler = async (req, res) => {
  try {
    const halls = await Hall.find();
    res.render("admin/halls", {
      title: "Halls",
      halls: halls,
    });
  } catch (err) {
    res.status(500).json({ errMsg: err.message });
  }
};
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/'); // Destination directory for uploaded files
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, 'picture-' + uniqueSuffix + fileExtension);
    }
});

const upload = multer({ storage: storage });

export { upload };


const halls_post_handler = async (req, res) => {
    // Handle file upload with multer
    upload.single('picture')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ errMsg: "Error uploading file" });
        } else if (err) {
            return res.status(500).json({ errMsg: err.message });
        }

        const { name, capacity, location, availability } = req.body;

        try {
            // Validate that required fields are present
            if (!name || !capacity || !location) {
                return res.status(400).json({ errMsg: "Please provide name, capacity, and location" });
            }

            // Check if hall with the same name or location already exists
            const existingHall = await Hall.findOne({ $or: [{ name }, { location }] });

            if (existingHall) {
                return res.status(409).json({
                    errMsg: existingHall.name === name ? "Hall name is already taken" : "Hall location is already taken",
                });
            }

            // Create a new Hall object based on the schema
            const newHall = new Hall({
                name,
                capacity,
                location,
                availability,
                picture: req.file.filename // Save the filename of the uploaded picture
            });

            // Save the new hall to the database
            await newHall.save();

            res.status(201).json({ message: "Hall created successfully", hall: newHall });
        } catch (err) {
            res.status(500).json({ errMsg: err.message });
        }
    });
};

export default{halls_post_handler,halls_get_handler} ;




