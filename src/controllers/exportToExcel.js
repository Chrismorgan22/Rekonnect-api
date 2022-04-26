const xl = require("excel4node");
const candidateModel = require("../model/candidate_model");
const userModel = require("../model/user_model");
const helperExport = async (userId) => {
  try {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet("Worksheet Name");
    var listUser;
    const candidateData = await candidateModel
      .findOne()
      .populate("user_id")
      .limit(1);
    console.log("candi", candidateData);
    candidateData.map((candidate, index) => {
      const { user_id, ...rest } = candidate;
      // rest._doc.user_id = undefined;
      const mainData = { ...user_id._doc, ...rest._doc };
      if (index == 0) console.log(mainData);
      listUser.push(mainData);
    });
    console.log(listUser, "list");
    //get the entire list
    var data = [];
    listUser.forEach((idx, entry) => {
      if (idx == 0) console.log(entry);
      var body = entry;
      const newBody = Object.values(body)[5];
      // console.log(newBody);

      for (var prop in newBody) {
        if (typeof newBody[prop] !== "string")
          newBody[prop] = JSON.stringify(newBody[prop]);
      }
      data.push(newBody);
    });
    console.log(data[0], "final!!");
    // const headingColumnNames = Object.keys(data[0]);
    // //Write Column Title in Excel file
    // let headingColumnIndex = 1;
    // headingColumnNames.forEach((heading) => {
    //   ws.cell(1, headingColumnIndex++).string(heading);
    // });
    // //Write Data in Excel file
    // let rowIndex = 2;
    // data.forEach((record) => {
    //   let columnIndex = 1;
    //   Object.keys(record).forEach((columnName) => {
    //     ws.cell(rowIndex, columnIndex++).string(record[columnName]);
    //   });
    //   rowIndex++;
    // });
    // wb.write("data.xlsx");
  } catch (error) {}
};

module.exports = { helperExport };
