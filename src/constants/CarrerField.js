const carrerList = [
  {
    name: "Business Awareness",
    lookup_type: "Soft_skills",
  },
  {
    name: "Customer Orientation",
    lookup_type: "Soft_skills",
  },
  {
    name: "Problem Solving",
    lookup_type: "Soft_skills",
  },
  {
    name: "Quick Learning/Thinking",
    lookup_type: "Soft_skills",
  },
  {
    name: "Team Work",
    lookup_type: "Soft_skills",
  },
  {
    name: "Communication",
    lookup_type: "Soft_skills",
  },
  {
    name: "Decision making",
    lookup_type: "Soft_skills",
  },
  {
    name: "Html",
    lookup_type: "Technical_skills",
  },
  {
    name: "Microsoft Word",
    lookup_type: "Technical_skills",
  },
  {
    name: "Others",
    lookup_type: "Technical_skills",
  },
  {
    name: "Excel",
    lookup_type: "Technical_skills",
  },
  {
    name: "CSS",
    lookup_type: "Technical_skills",
  },
  {
    name: "JavaScript",
    lookup_type: "Technical_skills",
  },
  {
    name: "MySql",
    lookup_type: "Technical_skills",
  },
  {
    name: "NodeJs",
    lookup_type: "Technical_skills",
  },
  {
    name: "PHP",
    lookup_type: "Technical_skills",
  },
  {
    name: "Hindi",
    lookup_type: "Language",
  },
  {
    name: "English",
    lookup_type: "Language",
  },
  {
    name: "Food",
    lookup_type: "Career",
  },
  {
    name: "Music",
    lookup_type: "Career",
  },
  {
    name: "Art",
    lookup_type: "Career",
  },
  {
    name: "Craft",
    lookup_type: "Career",
  },
  {
    name: "Sports",
    lookup_type: "Career",
  },
  {
    name: "Painting",
    lookup_type: "Career",
  },
  {
    name: "Entertainment",
    lookup_type: "Career",
  },
  {
    name: "Fashion",
    lookup_type: "Career",
  },
  {
    name: "Travel",
    lookup_type: "Career",
  },
  {
    name: "Beauty",
    lookup_type: "Career",
  },
  {
    name: "Organized",
    lookup_type: "Career",
  },
  {
    name: "Dance",
    lookup_type: "Career",
  },
  {
    name: "Lifestyle",
    lookup_type: "Career",
  },
  {
    name: "Teaching",
    lookup_type: "Career",
  },
  {
    name: "Photographer",
    lookup_type: "Career",
  },
  {
    name: "Medicine",
    lookup_type: "Career",
  },
  {
    name: "Politics",
    lookup_type: "Career",
  },
  {
    name: "Startup mentor",
    lookup_type: "Career",
  },
  {
    name: "IT",
    lookup_type: "Career",
  },
  {
    name: "others",
    lookup_type: "Career",
  },
  {
    name: "Craft",
    lookup_type: "Career",
  },
  {
    name: "Pet Care",
    lookup_type: "Career",
  },
  {
    name: "Influencer",
    lookup_type: "Career",
  },
  {
    name: "Event Management",
    lookup_type: "Career",
  },
  {
    name: "Govt Jobs",
    lookup_type: "Career",
  },
  {
    name: "Aviation",
    lookup_type: "Career",
  },
  {
    name: "environmentalism",
    lookup_type: "Career",
  },
  {
    name: "Gardening  - Horticulture",
    lookup_type: "Career",
  },
  {
    name: "Robotics ",
    lookup_type: "Career",
  },
  {
    name: "Defence ",
    lookup_type: "Career",
  },
  {
    name: "Housekeeping",
    lookup_type: "Career",
  },
  {
    name: "Gaming ",
    lookup_type: "Career",
  },
  {
    name: " Influencer",
    lookup_type: "Career",
  },
  { name: "Algorithms", lookup_type: "Technical_skills" },
  { name: "Analytics", lookup_type: "Technical_skills" },

  { name: "Artificial Intelligence", lookup_type: "Technical_skills" },

  { name: "Automation", lookup_type: "Technical_skills" },

  { name: "Audit Trail", lookup_type: "Technical_skills" },

  { name: "Availability Management", lookup_type: "Technical_skills" },

  { name: "Back up and Recovery", lookup_type: "Technical_skills" },

  { name: "Batch processing", lookup_type: "Technical_skills" },

  { name: "Billing", lookup_type: "Technical_skills" },
  { name: "Capacity Managemnet", lookup_type: "Technical_skills" },
  { name: "cloud computing", lookup_type: "Technical_skills" },
  { name: "Computing infrastucture", lookup_type: "Technical_skills" },
  { name: "Configuration Management", lookup_type: "Technical_skills" },
  { name: "Centent Delivery Network", lookup_type: "Technical_skills" },
  { name: "Centent Management", lookup_type: "Technical_skills" },
  { name: "Cryptography", lookup_type: "Technical_skills" },
  { name: "Data Analysis", lookup_type: "Technical_skills" },
  { name: "Data Architecture", lookup_type: "Technical_skills" },
  { name: "Data Mining", lookup_type: "Technical_skills" },
  { name: "Data Processing", lookup_type: "Technical_skills" },
  { name: "Data Security", lookup_type: "Technical_skills" },
  { name: "Data Science", lookup_type: "Technical_skills" },
  { name: "DevOps", lookup_type: "Technical_skills" },
  { name: "Digital Advertising", lookup_type: "Technical_skills" },
  { name: "Digital Publishing", lookup_type: "Technical_skills" },
  { name: "E-Commerce", lookup_type: "Technical_skills" },
  { name: "Embedded System", lookup_type: "Technical_skills" },
  { name: "Encryption", lookup_type: "Technical_skills" },
  { name: "ETL", lookup_type: "Technical_skills" },
  { name: "Event Processing", lookup_type: "Technical_skills" },
  { name: "Game Development", lookup_type: "Technical_skills" },
  { name: "Hardware Design", lookup_type: "Technical_skills" },
  { name: "Incident Management", lookup_type: "Technical_skills" },
  { name: "Information Assurance", lookup_type: "Technical_skills" },
  { name: "Information Design", lookup_type: "Technical_skills" },
  { name: "Information Security", lookup_type: "Technical_skills" },
  { name: "Internet Of Things", lookup_type: "Technical_skills" },
  { name: "It Infrastucture", lookup_type: "Technical_skills" },
  { name: "Machine Learning", lookup_type: "Technical_skills" },
  { name: "Marketing Automation", lookup_type: "Technical_skills" },
  { name: "Microservices", lookup_type: "Technical_skills" },
  { name: "Mobile App Development", lookup_type: "Technical_skills" },
  { name: "Networking", lookup_type: "Technical_skills" },
  { name: "NoSQL Databases", lookup_type: "Technical_skills" },
  { name: "Office Automation", lookup_type: "Technical_skills" },
  { name: "Payments", lookup_type: "Technical_skills" },
  { name: "Project Management", lookup_type: "Technical_skills" },
  { name: "Programming", lookup_type: "Technical_skills" },
  { name: "Robotics", lookup_type: "Technical_skills" },
  { name: "Scripting", lookup_type: "Technical_skills" },
  { name: "Software developemnt", lookup_type: "Technical_skills" },
  { name: "Software Testing", lookup_type: "Technical_skills" },
  { name: "Statistics", lookup_type: "Technical_skills" },
  { name: "User Interface Design", lookup_type: "Technical_skills" },
  { name: "Web Design", lookup_type: "Technical_skills" },
  { name: "Web Development", lookup_type: "Technical_skills" },
  { name: "workflow", lookup_type: "Technical_skills" },
  { name: "workload Automation", lookup_type: "Technical_skills" },
];

module.exports = carrerList;
