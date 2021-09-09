const locationService = require('../services/location_service');
const func = require('../config/function');

const getLocation = async (req, res) => {
    console.log('getLocation')
    try {
        const locationData = await locationService.getLocationService()
        console.log(locationData)
        return res.send(locationData)
    } catch (err) {
        return res.send(err)
    }

}


module.exports = { getLocation }