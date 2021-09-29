const lookupService = require('../services/lookup_service');

const getLookupDetails = async (req, res) => {
    console.log('getLookupDetails')
    try {
        const lookupData = await lookupService.getCountryService(req.body)
        console.log(lookupData)
        return res.send(lookupData)
    } catch (err) {
        return res.send(err)
    }

}


module.exports = { getLookupDetails }