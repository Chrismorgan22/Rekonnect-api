const getHealth = async (req, res) => {
    try {
        let mongourl = process.env.DATABASE_URL
        let result = {
            success: true,
            message: `Server health is fine and working...  MONGO URL: ${mongourl}`
        }
        return res.send(result)
    } catch (err) {
        return res.send(err)
    }
}

module.exports = { getHealth }
