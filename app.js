const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const loginCheck = require('./loginCheck.js')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('login')
})

app.post('/', (req, res) => {
  const { email, password } = req.body
  const { isChecked, msg, user } = loginCheck({ email, password })

  if (isChecked) {
    res.render('index', { user })
  } else {
    res.render('login', { msg })
  }

})

app.listen(port, () => {
  console.log(`App is listening on localhost:${port}`)
})
