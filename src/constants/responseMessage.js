let messageJson = {
    notFoundJson: {
        status: 404,
        result: 'fail',
        message: 'Not Found'
    },
    errorJson: {
        result: 'fail'
    },
    successJson: {
        status: 200,
        result: 'success',
        // message: 'Successfully'
    },
    requestBodyJson: {
        result: 'fail',
        message: 'Request Body Is Required'
    }
}

module.exports = messageJson;
