const express = require('express')
const cors = require('cors')
const { AppDataSource } = require('./data-source')
import routes from './routes'


AppDataSource.initialize().then(() => {
    const app = express()

    app.use(cors())

    app.use(express.json())

    app.use(routes)

    return app.listen(process.env.PORT)
})