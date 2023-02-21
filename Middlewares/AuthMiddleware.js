const jwt = require('jsonwebtoken')

const loginAccess = (req, res, next) => {

    try {

        let token = req.headers.authorization
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' })
        } else {
            token = token.split(" ")[1]
            const decoded = jwt.verify(token, 'secretkey')
            req.Id = decoded.userId
        }

        next()
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized' })
    }
}

module.exports = loginAccess