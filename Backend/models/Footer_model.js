import mongoose from "mongoose";

const FooterSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      required: false,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    socialLinks: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      twitter: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },
    quickLinks: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    paymentMethods: [{ type: String, }],
  },
  { timestamps: true }
);

const Footer = mongoose.model("Footer", FooterSchema);
export default Footer;
