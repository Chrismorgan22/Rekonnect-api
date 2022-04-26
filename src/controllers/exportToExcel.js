const xl = require("excel4node");
const candidateModel = require("../model/candidate_model");
const userModel = require("../model/user_model");
const helperExport = async (userId) => {
  console.log("getting called!!");
  try {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet("Worksheet Name");
    const candidate = await candidateModel.findOne({ user_id: userId });
    const user = await userModel.findOne({ _id: userId });
    const final = { user, candidate };
    console.log(final);
    finalData = {
      name: final.user.first_name + final.user.last_name,
      email: final.user.email,
      phone: final.user.phone,
      state: final.candidate.address_details.state.name,
      zipcode: final.candidate.address_details.zip_code,
      education: final.candidate.education_data.education_type,

      experience: final.candidate.experience_data.experience_type,
      passion: final.candidate.passion,
      resume: final.candidate.resume_url,
    };
    if (final.candidate.education_data.education_type !== "Non-Educated") {
      final.candidate.education_data.education_details.forEach((item) => {
        //check if the value is string only then store them.
        const keys = ["school_name", "grade", "description"];
        console.log(item["grade"]);
        console.log(keys);

        var body;
        for (x in keys) {
          if (typeof item[x] == "String") {
            body[x] = item[x];
          }
        }
        // console.log(body);
      });
    }
    const data = [finalData];
    const headingColumnNames = Object.keys(finalData);
    //Write Column Title in Excel file
    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    });
    //Write Data in Excel file
    let rowIndex = 2;
    data.forEach((record) => {
      let columnIndex = 1;
      Object.keys(record).forEach((columnName) => {
        ws.cell(rowIndex, columnIndex++).string(record[columnName]);
      });
      rowIndex++;
    });
    wb.write("data123.xlsx");
  } catch (error) {}
};

module.exports = { helperExport };
