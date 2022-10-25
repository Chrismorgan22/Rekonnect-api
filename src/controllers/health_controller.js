const getHealth = async (req, res) => {
    try {
        let result = {
            success: true,
            message: "Server health is fine and working..."
        }
        return res.send(result)
    } catch (err) {
        return res.send(err)
    }
}

module.exports = { getHealth }
