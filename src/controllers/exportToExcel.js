const xl = require("excel4node");
const candidateModel = require("../model/candidate_model");
const userModel = require("../model/user_model");
const helperExport = async (userId) => {
  try {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet("Worksheet Name");
    var listUser = [];
    const candidateData = await candidateModel.find().populate("user_id");
    console.log(candidateData[10]);
    const newState = new Array();
    // candidateData.map(async (can) => {
    //   // console.log("zata re run ho?");

    //   try {
    //     const userdata = await userModel.findOne({
    //       _id: can._doc.user_id,
    //     });

    //     const finalData = { ...userdata?._doc, ...can?._doc };
    //     newState.push(finalData);
    //   } catch (e) {
    //     console.log(e);
    //   }

    //   //

    //   // if (idx == 50) {
    //   //   console.log(finalData);
    //   // }
    // });
    console.log(newState);
    const testdata = candidateData;
    testdata.map((candidate, index) => {
      const { user_id, ...rest } = candidate;
      // console.log(user_id);

      // rest._doc.user_id = undefined;
      if (user_id !== null) {
        const mainData = { ...user_id?._doc, ...rest._doc };

        // if (index == 9) console.log(mainData, "testdata");
        mainData.user_id = null;
        const data = mainData;
        // console.log(typeof data.first_name);
        data.education_type = data.education_data.education_type;
        data.experience_type = data.experience_data.experience_type;
        data.current_carrer = data.current_career.name;
        salary_max = data.salary_range.max;
        salary_min = data.salary_range.min;

        data.state = data.address_details.state.name;
        data.zip_code = data.address_details.zip_code;
        data.address_details = null;

        listUser.push(data);
      }
    });
    console.log(listUser[77], "list");
    //get the entire list
    var data = [];
    listUser.map((entry, idx) => {
      // if (idx == 0) console.log(entry, "from last");
      var body = entry;
      const newBody = entry;
      // console.log(newBody, "top booty");

      for (var prop in newBody) {
        if (typeof newBody[prop] === "string") {
          newBody[prop] = newBody[prop];
        } else if (typeof newBody[prop] === "boolean") {
          newBody[prop] = JSON.stringify(newBody[prop]);
        } else if (typeof newBody[prop] === "number") {
          newBody[prop] = JSON.stringify(newBody[prop]);
        } else {
          newBody[prop] = "NILL";
        }
      }
      // console.log(newBody, "new booty");
      data.push(newBody);
    });
/*     // console.log(data[77], "final!!");
    const headingColumnNames = Object.keys(data[77]);
    //Write Column Title in Excel file
    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading) => {
      ws.cell(1, headingColumnIndex++).string(heading);
    }); */
    //Write Data in Excel file
    let rowIndex = 2;
    data.forEach((record) => {
      let columnIndex = 1;
      Object.keys(record).forEach((columnName) => {
        ws.cell(rowIndex, columnIndex++).string(record[columnName]);
      });
      rowIndex++;
    });
    wb.write("data.xlsx");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { helperExport };
