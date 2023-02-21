const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const Router = require('./Router/Router')


dotenv.config()
const PORT = process.env.PORT || 5000
const MONGODB_URL = process.env.MONGODB_URL
const app = express();

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server is listning on Port no ${PORT}`))
}).catch((err) => console.log(err))

app.use(cors())
app.use(bodyParser.json())
app.use('/', Router)