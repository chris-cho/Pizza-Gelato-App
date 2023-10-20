<div align="center">
<a href="pizzagelato">
    <img src="https://www.travelandleisure.com/thmb/vcylUe1we5XfeBZTX08_rSYgZFg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/little-babys-philadelphia-pizza-ice-cream-ICEPIZZA0617-8dbd5862ef744fc7873b6fe0e8126b8f.jpg" alt="Logo" width="200" height="120">
  </a>
  <h3 align="center">Pizza Gelato App</h3>

  <p align="center">
    An awesome SMS responder for all Pizza and Gelato lovers!
    <br />
  </p>
</div>



<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    </li>
    <li><a href="#making-changes">Making Changes</a></li>
  </ol>
</details>



## About The Project

There are many reasons to love pizza or gelato but have you had them together? Look no further because this app is for those pizza & gelato lovers who cannot have one without the other!

This project will set you up with an SMS application that will:
* Receive inbound messages
* Check the text for keywords
* Respond to the text based on the keyword
* Blow your mind and appetite

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This app is built on Node JS with the following libraries and frameworks:

* <a href=https://www.npmjs.com/package/telnyx>Telnyx</a>
* <a href=https://www.npmjs.com/package/express>Express</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Getting Started

### Prerequisites

* [Node JS](https://nodejs.org/en/download/current)
* [Git](https://www.git-scm.com/)<br />
_If you need a refresher, look [here](https://www.w3schools.com/git/default.asp?remote=github)_
* NPM <br/>
  ```sh
  npm install npm@latest -g
  ```
* Server Hosting Platform<br/>
_(optional) [ngrok](https://ngrok.com/download)_
* Environment Variables<br/>
_Mainly for Windows: please make sure your environmental variables are set properly_
<a href="env_var">
    <img src="https://i.imgur.com/DiZSE7T.png" width="250" height="80">
  </a>

### Installation

1. Set your account up with [Telnyx](https://portal.telnyx.com/#/login/sign-in) and grab your API Key from the dashboard
2. Clone the repo
   ```sh
   git clone https://github.com/chris-cho/Pizza-Gelato-App.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API Key in `config.js`
   ```js
   const apiKey = 'ENTER YOUR API KEY';
   ```
5. Get a number from Telnyx
<a href="usage_1">
    <img src="https://i.imgur.com/rIbbpNG.png" width="800" height="350">
  </a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Usage

1. Start ngrok on port 5000 and grab the URL 
```sh
   ngrok http 5000
   ```

2. Copy URL next to Forwarding<br/>
_Forwarding URL is temporary on free tier, meaning you will have to do the next step every time you rerun ngrok_
```sh
    Session Status                online                                                                                    
    Account                                                                                 
    Version                       3.3.5                                                                                     
    Region                        United States (California) (us-cal-1)                                                     
    Latency                       23ms                                                                                      
    Web Interface                 http://127.0.0.1:4040                                                                     
    Forwarding                 ** https://8986-40-137-50-49.ngrok-free.app -> http://localhost:5000               
    Connections                   ttl     opn     rt1     rt5     p50     p90                                                                             
                                  0       0       0.00    0.00    0.00    0.00  
```
3. Go back to Telnyx and paste forwarding URL as the webhook, appended with /messaging/inbound<br/>
_Remember to apply the edited messaging profile on your Telnyx number: Numbers -> My Numbers -> Messaging Profile_
<a href="usage_1">
    <img src="https://i.imgur.com/Xho73VJ.png" width="700" height="600">
  </a>

4. Run your code
```sh
   node ./app.js
   ```

5. Send a message from your cell phone to your Telnyx number with and without the specified keywords<br/>
_You should see status updates logging on your console_
```sh
Incoming message... 
From: +E164
To: +E164
Text: What pizza should I get today?

Replying... 
From: +E164
To: +E164
Text: It's me, Mario! Come try out our new pizza menu, toad mushroom pizza!

Message Sent!

Sent message has successfully been delivered!
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Making Changes

1. Port<br/>
```js
// line 84-86
app.listen(5000, () => { 
  console.log(`Listening on port 5000. Script published on /messaging/inbound.`)
})
```

2. Keywords<br/>
_Modify array and responses_

```js
// line 80
let keywords = ['icecream', 'pizza']

// line 58-61
pizza: `It's me, Mario! Come try out our new pizza menu, toad mushroom pizza!`,
gelato: `It's me, Luigi! Come check out our seasonal menus at Big Boo Gelato!`,
both: `Try out the Mario brothers' lunch combo today! Comes with a Supreme Mario Pizza and a scoop of the infamous Yoshi shell Gelato!`,
neither: `Thanks for texting the Mario Brothers! Text 'pizza' or 'gelato' to find out more about our restaurants!`,
```

3. Responses to corresponding status
```js
// line 17-33
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
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
