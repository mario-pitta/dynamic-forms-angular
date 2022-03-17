const http = require('http')
const request = require('request')
const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')

const urlDBJson = 'http://localhost:3000/'

app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


/** ROTAS QUESTOES */
//#region ROTAS QUESTAO
app.get('/questions', (req, res) => {
    dbReq = http.request(urlDBJson + 'questions', (response) => {
        response.on("data", (data) => {
            console.log('respondendo lista de questoes')
            res.send(JSON.parse(data))
        })
    })
    dbReq.end()
})


app.get('/questions/:id', (req, res) => {
    id = req.path.split('/')[req.path.split('/').length - 1]
    dbReq = http.request(urlDBJson + 'questions/' + id, (response) => {
        response.on("data", (data) => {
            console.log('respondendo questao ' + id)
            res.send(JSON.parse(data))
        })
    })
    dbReq.end()
})

app.put('/questions', (req, res) => {
    data = req.body
    console.log('entrou no put da questao ' + id)
    if (data) {
        url = urlDBJson + `questions/` + data.id
        sendToDB(url, data, res, req.method)
    }
})


app.post('/questions', (req, res) => {
    data = req.body
    if (data) {
        url = urlDBJson + 'questions/'
        sendToDB(url, data, res, req.method)
    }
})


app.delete('/questions/:id', (req, res) => {
    data = req.path.split('/')
    data = data[data.length - 1]
    console.log(data)
    console.log('entrou no delete')
    dbReq = new request(
        `${urlDBJson}questions/${data}`, { method: 'DELETE' },
        (error, response, body) => {

            res.status(response.statusCode).send(body)
        })
    dbReq.end()
})

//#endregion


/** ROTAS FORMULARIOS */
//#region 
app.get('/formularios', (req, res) => {
    console.log('entrou formularios get')
    dbReq = http.request(urlDBJson + 'formularios', (response) => {
        response.on("data", (data) => {
            console.log('respondendo')
            res.send(JSON.parse(data))
        })
    })
    dbReq.end()
})

app.get('/formularios/:id', async(req, res) => {
    console.log('entrou formularios getById')
    id = req.path.split('/')[req.path.split('/').length - 1]
    var questions = []
    var form = {}

    dbReq = await http.request(urlDBJson + 'formularios/' + id, (response) => {
        response.on("data", (data) => {
            console.log('foi buscar no bd')
            res.send(JSON.parse(data))
        })
    })
    dbReq.end()
})


app.post('/formularios', (req, res) => {
    data = req.body
    url = urlDBJson + `formularios/`

    sendToDB(url, data, res, req.method)
})
app.put('/formularios/:id', (req, res) => {
    data = req.body
    url = urlDBJson + `formularios/${data.id}`
    sendToDB(url, data, res, req.method)
})

app.delete('/formularios/:id', (req, res) => {
    console.log('entrou no delete')
    id = req.path.split('/')[req.path.split('/').length - 1]
    console.log(id)
    dbReq = new request(
        `${urlDBJson}formularios/${id}`, { method: 'DELETE' },
        (error, response, body) => {
            (error) ? res.status(error.statusCode).send(error):
                res.status(response.statusCode).send(body)
        })
    dbReq.end()
})

//#endregion



function sendToDB(url, data, res, method) {
    console.log(method)
    dbReq = new request(
        url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        },
        (error, response, body) => {
            if (error) {
                res.status(error.status).send(error)
                throw error
            } else {
                res.status(response.statusCode).send(response)
            }

            dbReq.end()
        })
}



app.listen(5000)
console.log('Listening on port 5000')