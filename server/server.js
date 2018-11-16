const express = require('express')
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4')

const app = express()
const port = 4567

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods", 
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let items = [
  { id: uuidv4(), item: 'Learn about PWAs' },
  { id: uuidv4(), item: 'Make an awesome app' }
]

app.get('/items.json', (req, res) => {
  res.json(items)
})

app.post('/items.json', (req, res) => {
  items.push({
    id: uuidv4(),
    item: req.body.item
  })
  res.json(items)
})

app.delete('/items.json', (req, res) => {
  items = items.filter(item => {
    if(item.id !== req.body.id) {
      return item
    }
  })
  res.json(items)
})

app.listen(port, () => console.log(`Todo server listening on port ${port}!`))
