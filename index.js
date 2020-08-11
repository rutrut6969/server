const express = require('express');
// const cors = require('cors');
const twilio = require('twilio');

const accountSid = 'ACef9fa9f0d8324f02842689b653d4506f';
const authToken = 'cf069c6070b05fd246929294ab37404b';
const client = new twilio(accountSid, authToken);

const app = express();
// app.use(cors());
app.get('/', (req, res) => {
  res.send('Welcome to the Express Server');
});

app.get('/send-text', (req, res) => {
  const { recipient, message, name, phone, email, packaged } = req.query;
  console.log(message);
  client.messages
    .create({
      body: `Name: ${name}, Phone: ${phone}, E-mail: ${email}, Package: ${packaged}, Message: ${message}`,
      to: recipient,
      from: '+12058437485', //From Twilio
    })
    .then((message) => {
      console.log(message.body);
    });
});

app.listen(4000, () => console.log('Running on Port 4000'));
