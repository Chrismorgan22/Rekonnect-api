const carrerList = [
  {
    name: "Accountants",
    lookup_type: "Career",
  },
  {
    name: "Accountants and Auditors",
    lookup_type: "Career",
  },
  {
    name: "Advertising Sales Agents",
    lookup_type: "Career",
  },
  {
    name: "Agriculture, Food and Natural Resources",
    lookup_type: "Career",
  },
  {
    name: "Applications programmer",
    lookup_type: "Career",
  },
  {
    name: "Architecture and Construction",
    lookup_type: "Career",
  },
  {
    name: "Asset Management Careers",
    lookup_type: "Career",
  },
  {
    name: "Auditors",
    lookup_type: "Career",
  },
  {
    name: "Automotive Service Technicians and Mechanics",
    lookup_type: "Career",
  },
  {
    name: "Automotive Specialty Technicians",
    lookup_type: "Career",
  },
  {
    name: "Bank Manager Careers",
    lookup_type: "Career",
  },
  {
    name: "Biochemical Engineers",
    lookup_type: "Career",
  },
  {
    name: "Biochemists",
    lookup_type: "Career",
  },
  {
    name: "Biological Science",
    lookup_type: "Career",
  },
  {
    name: "Bookkeeping, Accounting, and Auditing Clerks",
    lookup_type: "Career",
  },
  {
    name: "Budget Analysts",
    lookup_type: "Career",
  },
  {
    name: "Chemistry Teachers",
    lookup_type: "Career",
  },
  {
    name: "Clinical and Counseling Psychologists",
    lookup_type: "Career",
  },
  {
    name: "Counselors",
    lookup_type: "Career",
  },
  {
    name: "Database administrator",
    lookup_type: "Career",
  },
  {
    name: "Economics Teacher",
    lookup_type: "Career",
  },
  {
    name: "Electricians",
    lookup_type: "Career",
  },
  {
    name: "Engineer",
    lookup_type: "Career",
  },
  {
    name: "Engineering Teacher",
    lookup_type: "Career",
  },
  {
    name: "Environmental Science Teacher",
    lookup_type: "Career",
  },
  {
    name: "File Clerks",
    lookup_type: "Career",
  },
  {
    name: "Financial Analyst Careers",
    lookup_type: "Career",
  },
  {
    name: "Financial Managers",
    lookup_type: "Career",
  },
  {
    name: "Financial Trading Careers",
    lookup_type: "Career",
  },
  {
    name: "Geography Teacher",
    lookup_type: "Career",
  },
  {
    name: "Graduate Teaching",
    lookup_type: "Career",
  },
  {
    name: "Healthcare Social Worker",
    lookup_type: "Career",
  },
  {
    name: "Information security officer",
    lookup_type: "Career",
  },
  {
    name: "Insurance Manager Careers",
    lookup_type: "Career",
  },
  {
    name: "Interior desginer",
    lookup_type: "Career",
  },
  {
    name: "Interior Designers",
    lookup_type: "Career",
  },
  {
    name: "Interior Designers",
    lookup_type: "Career",
  },
  {
    name: "Investment Banking Careers",
    lookup_type: "Career",
  },
  {
    name: "IT business analyst",
    lookup_type: "Career",
  },
  {
    name: "Lawyer",
    lookup_type: "Career",
  },
  {
    name: "Management Analysts",
    lookup_type: "Career",
  },
  {
    name: "Marketing Managers",
    lookup_type: "Career",
  },
  {
    name: "Mechanical Engineer",
    lookup_type: "Career",
  },
  {
    name: "Mental Health Counselor",
    lookup_type: "Career",
  },
  {
    name: "Project Management",
    lookup_type: "Career",
  },
  {
    name: "Project manager (IT)",
    lookup_type: "Career",
  },
  {
    name: "Quality Tester",
    lookup_type: "Career",
  },
  {
    name: "Sales Manager",
    lookup_type: "Career",
  },
  {
    name: "Software Developer",
    lookup_type: "Career",
  },
  {
    name: "Software quality assurance & testing",
    lookup_type: "Career",
  },
  {
    name: "Software trainer",
    lookup_type: "Career",
  },
  {
    name: "Supply Chain Manager",
    lookup_type: "Career",
  },
  {
    name: "Wind Energy Development Manager",
    lookup_type: "Career",
  },
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
];

module.exports = carrerList;
