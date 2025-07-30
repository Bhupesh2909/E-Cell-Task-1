import Startup from "../models/Startup.js";


export const createStartup = async (req, res) => {
  const { name, description, founder, email, domain, role } = req.body;

  if (!name || !description || !founder || !email || !domain || !role) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  try {
    const newStartup = new Startup({ name, description, founder, email, domain, role });
    await newStartup.save();
    res.status(201).json(newStartup);
  } catch (error) {
    console.error("Error creating startup:", error.message);
    res.status(500).json({ message: 'Server Error while creating startup' });
  }
};


export const getStartups = async (req, res) => {
  try {
    const startups = await Startup.find().sort({ createdAt: -1 });
    res.status(200).json(startups);
  } catch (error) {
    console.error("Error fetching startups:", error.message);
    res.status(500).json({ message: 'Server Error while fetching startups' });
  }
};


