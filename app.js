const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./public/apis/restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  const { results } = restaurantList
  res.render('index', { restaurants: results })
})

app.get('/restaurants/:restaurantId', (req, res) => {
  const { results } = restaurantList
  const restaurant = results.find(el => el.id + '' === req.params.restaurantId)

  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const { results } = restaurantList
  const { keyword } = req.query
  const restaurants = results.filter(el =>
    el.name.toLowerCase().includes(keyword.toLowerCase())
  )

  res.render('index', { restaurants, keyword })
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
