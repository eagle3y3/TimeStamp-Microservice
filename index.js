const express = require('express')

const app = express()
const portNumber = process.env.PORT || '8000'

app.listen(portNumber, () => {
  console.log('listening in on port ${portNumber}')
});

app.get('/', (req,res) => {
  res.sendFile('views/index.html', { root: __dirname });
});

app.get('/api/timestamp/:date_string?', (req, res) => {
  const dateString = req.params.date_string;

  //3. If the date string is empty it should be equivalent to trigger new Date(), i.e. the service uses the current timestamp.
  let date;
  if(!dateString) {
    date = new Date()
  } else {
    //non-empty dateString
    //if date is integer, convert datestring to integer
    if(!isNaN(dateString)) {
      date = new Date(parseInt(dateString))
    } else {
    date = new Date(dateString)
    }
  }
  /*
  4. If the date string is valid the api returns a JSON having the structure
    {"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
    e.g. {"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}

  5. If the date string is invalid the api returns a JSON having the structure
    {"error" : "Invalid Date" }.
  */
  if (date.toString() === "Invalid Date") {
    res.json({ "error": "Invalid Date" })
  } else {
    res.json({ unix : date.getTime(), utc : date.toUTCString() })
  }
});

app.use('/public', express.static('public'));
