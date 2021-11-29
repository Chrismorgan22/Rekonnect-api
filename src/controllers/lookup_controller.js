const lookupService = require("../services/lookup_service");
const carrerList = require("../constants/CarrerField");
const LookUpModel = require("../model/lookup_model");

const carress = [
  { name: "Data science intern", lookup_type: "Carrer" },
  { name: "Data manager intern", lookup_type: "Carrer" },
];
const getLookupDetails = async (req, res) => {
  console.log("getLookupDetails");
  try {
    const lookupData = await lookupService.getCountryService(req.body);
    console.log(lookupData);
    return res.send(lookupData);
  } catch (err) {
    return res.send(err);
  }
};

const postCarrerOptions = async (req, res) => {
  const list = [];
  try {
    // carrerList.map(async (carrer) => {
    //   try {
    //     const newCarrer = new LookUpModel({
    //       name: carrer.name,
    //       lookup_type: carrer.lookup_type,
    //     });
    //     const savedCarrer = await newCarrer.save();
    //     list.push(savedCarrer);
    //     res.status(200).josn("zalee");
    //   } catch (error) {
    //     return res.status(500).json(error);
    //   }
    // });
    // try {
    console.log(carress.length);
    var i = 0;
    while (i < 2) {
      const newCarrer = new LookUpModel({
        name: carress[i].name,
        lookup_type: carress[i].lookup_type,
      });
      const savedCarrer = await newCarrer.save();
      list.push(savedCarrer);
      i++;
      //   return res.status(200).json(savedCarrer);
    }
    // } catch (error) {
    //   res.status(500).json(error);
    // }
    // addCarrers();
    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { getLookupDetails, postCarrerOptions };
