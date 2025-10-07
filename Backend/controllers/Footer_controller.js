import Footer from "../models/Footer_model.js";

// Create Footer
export const createFooter = async (req, res) => {
  try {
    const {
      companyName,
      description,
      address,
      email,
      phone,
      quickLinks,
      facebook,
      instagram,
      twitter,
      youtube,
    } = req.body;

    const logo = req.files.logo ? req.files.logo[0].filename : null;

    const paymentMethodsImages = req.files.paymentMethods
      ? req.files.paymentMethods.map(file => file.filename)
      : [];

    const socialLinks = {
      facebook: facebook || "",
      instagram: instagram || "",
      twitter: twitter || "",
      youtube: youtube || "",
    };

    const footer = new Footer({
      companyName,
      description,
      address,
      email,
      phone,
      logo,
      socialLinks,
      quickLinks: quickLinks ? JSON.parse(quickLinks) : [],
      paymentMethods: paymentMethodsImages,
    });

    await footer.save();

    res.status(201).json({
      success: true,
      message: "Footer created successfully",
      footer,
    });
  } catch (error) {
    console.error("Error creating footer:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// Get all Footer data
export const getFooter = async (req, res) => {
  try {
    const footer = await Footer.find();
    res.status(200).json({ success: true, data: footer });
  } catch (error) {
    console.error("Error fetching footer:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Update Footer by ID
export const updateFooter = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      companyName,
      description,
      address,
      email,
      phone,
      facebook,
      instagram,
      twitter,
      youtube,
      quickLinks,
      paymentMethods,
    } = req.body;

    const image = req.file ? req.file.filename : undefined;

    const socialLinks = {
      facebook: facebook || "",
      instagram: instagram || "",
      twitter: twitter || "",
      youtube: youtube || "",
    };

    const updatedData = {
      companyName,
      description,
      address,
      email,
      phone,
      socialLinks,
      quickLinks: quickLinks ? JSON.parse(quickLinks) : [],
      paymentMethods: paymentMethods ? JSON.parse(paymentMethods) : [],
    };

    if (image) updatedData.logo = image;

    const footer = await Footer.findByIdAndUpdate(id, updatedData, { new: true });

    if (!footer)
      return res.status(404).json({ success: false, message: "Footer not found" });

    res.status(200).json({
      success: true,
      message: "Footer updated successfully",
      footer,
    });
  } catch (error) {
    console.error("Error updating footer:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


// Delete Footer by ID
export const deleteFooter = async (req, res) => {
  try {
    const { id } = req.params;
    const footer = await Footer.findByIdAndDelete(id);
    if (!footer)
      return res.status(404).json({ success: false, message: "Footer not found" });

    res.status(200).json({ success: true, message: "Footer deleted successfully" });
  } catch (error) {
    console.error("Error deleting footer:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
