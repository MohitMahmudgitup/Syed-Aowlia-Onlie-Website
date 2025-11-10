import Hero from "../models/Hero_model.js";
import { connetCloudnary, cloudinaryInstance } from "../config/cloudinary.js";

// Add Hero Images
export const addHeroImage = async (req, res) => {
  try {
    connetCloudnary();

    if (!req.files || req.files.length === 0) {
      console.log("No files found in the request");
      return res.status(400).json({ message: "No images provided" });
    }

    let imageLinks = [];

    for (const file of req.files) {
      const upload = await cloudinaryInstance.uploader.upload(file.path, {
        folder: "hero_images",
      });
      imageLinks.push(upload.secure_url);
    }

    // Check if a hero document exists
    let hero = await Hero.findOne();
    if (hero) {
      // Add new images to existing array
      hero.image.push(...imageLinks);
      await hero.save();
    } else {
      // Create first hero document
      hero = await Hero.create({ image: imageLinks });
    }

    res.status(201).json({
      success: true,
      message: "Hero images added successfully",
      data: hero,
    });

  } catch (error) {
    console.error("Error in addHeroImage:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all Hero images
export const getHeroImages = async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.status(200).json({ success: true, data: heroes });
  } catch (error) {
    console.error("Error in getHeroImages:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Hero images by ID (replace with new images)
export const updateHeroImages = async (req, res) => {
  try {
    connetCloudnary();

    const heroId = req.params.id;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images provided for update" });
    }

    let imageLinks = [];
    for (const file of req.files) {
      const upload = await cloudinaryInstance.uploader.upload(file.path, {
        folder: "hero_images",
      });
      imageLinks.push(upload.secure_url);
    }

    const updatedHero = await Hero.findByIdAndUpdate(
      heroId,
      { image: imageLinks },
      { new: true } // return updated document
    );

    if (!updatedHero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    res.status(200).json({
      success: true,
      message: "Hero images updated successfully",
      data: updatedHero,
    });

  } catch (error) {
    console.error("Error in updateHeroImages:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Delete Hero by ID
export const deleteHero = async (req, res) => {
  try {
    const heroId = req.params.id;
    const hero = await Hero.findByIdAndDelete(heroId);

    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    res.status(200).json({
      success: true,
      message: "Hero deleted successfully",
    });

  } catch (error) {
    console.error("Error in deleteHero:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteSingleHeroImage = async (req, res) => {
  try {
    const { imageUrl } = req.body; // URL of the image to delete
    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const hero = await Hero.findOne();
    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    // Remove the image from the array
    const updatedImages = hero.image.filter(img => img !== imageUrl);
    hero.image = updatedImages;
    await hero.save();

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: hero,
    });

  } catch (error) {
    console.error("Error in deleteSingleHeroImage:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
