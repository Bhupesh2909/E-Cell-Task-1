import Application from "../models/Application.js";


export const createApplication = async (req, res) => {
  const { internshipId } = req.body;
  const studentId = req.user.id;


  if (!internshipId || !studentId) {
    return res.status(400).json({ message: 'Internship ID and Student ID are required' });
  }

  try {
    const alreadyApplied = await Application.findOne({ internshipId, studentId });
    if (alreadyApplied) {
      return res.status(409).json({ message: "You've already applied to this internship" });
    }

    const newApplication = new Application({ internshipId, studentId });
    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (error) {
    console.error("Error creating application:", error.message);
    res.status(500).json({ message: 'Server Error while creating application' });
  }
};


export const getApplications = async (req, res) => {
  try {
    let stapp = {};

    if (req.user.role === "student") {
      stapp.studentId = req.user.id;
    }

    const applications = await Application.find(stapp)
      .populate({
        path: 'studentId',
        select: 'name email'
      })
      .populate({
        path: 'internshipId',
        select: 'role domain startup'
      });

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error.message);
    res.status(500).json({ message: 'Server Error while fetching applications' });
  }
};





