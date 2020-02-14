# Ok Dog

[Ok Dog](http://www.ok-dog.work) is chatbot virtual assistant that can "fetch" your requests for top news headlines, jokes, and weather by city. Built by Gee-Wey Yue using React, Rails, and Google Dialogflow.

![Imgur](https://i.imgur.com/Cv0YWUF.gif)

## Motivation

- I wanted to learn about machine learning (ML) and artificial intelligence (AI) and explore the complexity of natural language processing (NLP). Building a chatbot project from scratch provided the best quality of learning in a short amount of time. 
- I wanted to create an universally helpful web application, so I based the MVP features off of the most popular commands given to home devices like Amazon Alexa.
- I wanted the web application to be easily accessible. It was important for the chatbot to be mobile-friendly with an intuitive user flow.
- I wanted the features to be easily scalable. I built the back-end to connect with different external APIs, with the ability to quickly add features.
- I wanted to leverage the power of large tech companies' knowledgebases. It turns out Google Dialogflow is a great entry into the Google Cloud platform.


## Stack

-	Front-end: React.js
-	Back-end: Rails API with custom webhook for receiving server requests from Google Dialogflow
-	Styling: Semantic UI with responsive display
-	Deployed: Netlify for front-end with custom domain; Heroku for back-end
-	APIs: connected with OpenWeatherMap API, News API, & icanhazdadjoke API


## Features

- Users can request for the top news headlines, jokes, and weather by city
- Users can follow a link to view the entirety of the news articles
- Users can receive updated top news headlines and weather reports
- Users can see the most recent message and scroll to view conversation history
- Users can use and view the application on mobile devices
- Users can expect no logging of their personal data

## License

MIT © [@geewey](https://github.com/geewey)
