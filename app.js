// for script hosting & JSON parsing
const express = require('express')
// best practice for authentication
const config = require('./config.js')
// authentication for Telnyx SDK
const telnyx = require('telnyx')(config.apiKey) 

const app = express()

// define methods for incoming messages
const inbound = { 
  // logs inbound message details
  logText(message) {
    console.log(`\nIncoming message... \nFrom: ${message.from.phone_number} \nTo: ${message.to[0].phone_number} \nText: ${message.text}`)
  },
  // check if message is for an inbound webhook or an MDR
  checkStatus(message) { 
    switch(message.to[0].status) {
      case 'webhook_delivered':
        this.logText(message)
        return true
      case 'sent':
        console.log(`\nMessage Sent!`)
        break
      case 'delivered':
        console.log(`\nSent message has successfully been delivered!`)
        break
      case 'failed':
        console.log(`\nMessage has failed to send.`)
        break
      default:
        console.log(`\nMessage status is ${message.to[0].status}`)
        break
    }
  },

  // check keyword using regex filter
  checkKeyword(string, keywords) { 
    // hold keyword and return at the end of method
    let word = 'other'

    keywords.forEach((keyword) => {
      string.replace(/[^\w\s\']|_/g, '').replace(/\s+/g, '').toLowerCase().includes(keyword) && (word = keyword)
    })

    return word
  } 
}

// define method to send SMS out and the text of it
const outbound = { 
  pizza: 'Chicago pizza is the best',
  icecream: 'I prefer gelato',
  other: `Please send either the word 'pizza' or 'ice cream' for a different response.`,

  // send message out using Telnyx SDK
  sendSms(from, to, text) { 
    telnyx.messages.create(
    {
      from,
      to,
      text
    },
      function(err, response) {
        // error catching for anything Telnyx SDK related
        err ?
        console.log(`\nAn error has occurred! Please refer to the Telnyx site for status code ${err.raw.statusCode} ${err.type}`)
        : console.log(`\nReplying...\nFrom: ${from} \nTo: ${to} \nText: ${text}`)
    })
  }
}

// parse request body as JSON
app.use(express.json()) 

// publish script to port 5000
app.listen(5000, () => { 
  console.log(`Listening on port 5000. Script published on /messaging/inbound.`)
}) 

// define what script should do when webhook is received on /messaging/inbound
app.post('/messaging/inbound', (req, res) => { 
  // words to look for
  let keywords = ['icecream', 'pizza'] 

  // hold message details for readability
  let message = req.body.data.payload 
  let to = req.body.data.payload.to[0]

  // if status = true, log details then send message out using identified prompt
  inbound.checkStatus(message) && outbound.sendSms(to.phone_number, message.from.phone_number, outbound[inbound.checkKeyword(message.text, keywords)])

  // respond to webhook with 200 OK
  res.sendStatus(200) 
})
