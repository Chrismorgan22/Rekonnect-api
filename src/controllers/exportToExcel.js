const xl = require("excel4node");
const candidateModel = require("../model/candidate_model");
const userModel = require("../model/user_model");
const helperExport = async (userId) => {
  try {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet("Worksheet Name");
    var listUser = [];
    const candidateData = await candidateModel.find().populate("user_id");

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

        if (index == 0) console.log(mainData, "testdata");
        mainData.user_id = null;
        listUser.push(mainData);
      }
    });
    // console.log(listUser[77], "list");
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
    console.log(data[77], "final!!");
    const headingColumnNames = Object.keys(data[77]);
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
    wb.write("data.xlsx");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { helperExport };
