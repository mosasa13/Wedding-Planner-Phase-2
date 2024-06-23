import User from "../../models/User.js";
import Service from "../../models/service.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const services_get = async (req, res) => {
  try {
    const services = await Service.find();
    const user = await User.findById(req.params.id);
    res.render("admin/services", {
      title: "Services",
      user,
      services,
    });
  } catch (error) {
    res.status(500).json({ errMsg: error.message });
  }
};

const createService_post = async (req, res) => {
  const serviceData = req.body;

  try {
    const newService = new Service(serviceData);
    await newService.save();
    res.json({ message: "Service added successfully" });
  } catch (error) {
    res.status(500).json({ errMsg: error.message });
  }
};

const uploadImage_post = async (req, res) => {
  const imageUrl = "/uploads/" + req.file.filename;
  res.json({ imageUrl });
};

const deleteServiceById_delete = async (req, res) => {
  const serviceId = req.params.serviceId;

  try {
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: "service not found" });
    }

    for (const imagePathObj of service.images) {
      const myPath = path.join(
        String(__dirname),
        "..",
        "..",
        "public",
        String(imagePathObj)
      );

      fs.unlink(myPath, (error) => {
        if (error) {
          return res.status(500).json({ errMsg: error });
        }
      });
    }

    await Service.findByIdAndDelete(serviceId);

    res.status(200).json({ message: "service deleted successfully" });
  } catch (error) {

    console.log(error)
    res.status(500).json({ errMsg: error });
  }
};

export default {
  services_get,
  createService_post,
  uploadImage_post,
  deleteServiceById_delete,
};
