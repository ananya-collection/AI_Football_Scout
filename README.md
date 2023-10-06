<p align="center">
 <img class="circle responsive-img" width=100px height=100px src="./website/views/images/project logo.jpg" alt="Project logo"></a>
</p>

<h3 align="center">AI Football Scout - Web application </h3>

<p align="center"> AI Football Scout is an Web NodeJS application for searching prospective football players using
simple web form user interface. 
    <br> 
</p>

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Running application](#run)
- [Running tests](#tests)
- [Documentation](#documentation)
- [Python data collection and prototyping](#python)
- [Authors](#authors)



## About <a name = "about"></a>

<i>The rising transfer fees budget is becoming more and more crazy especially for small and medium football clubs, so the majority of transfer market participants will rely only on the scouting department. Scouts around the world year by year are improving match statistic player profiles, but it requires a lot of human-operated analytics data transformation using Microsoft Excel until a decision can be made. “AI Football Scout” web application is aiming to replace searching needed prospective footballer’s profiles by ML algorithms allowing save significant amounts of time for scouts to highlight needed profiles for a small fee.</i>

<br>

The key user features of this product are:
<ul>
<li>Ability to show product features on the home page, subscription plans, about the company and collect potential customer queries using the contact us page. </li>
<li>Ability to login and sign up to the product. </li>
<li>Ability to subscribe to product services using subscription page and popup.</li>  
<li>Ability to provide payments. </li>
<li>Ability to send form players profile requests to the AI algorithm. </li>
<li>Ability to receive the AI algorithm output and see history of queries. </li>
<li>Ability to visit user profile and see user data, change password etc. </li>
<li>Ability to recieve user notifications and see reflections of server or database data. </li>
<li>Ability to add and delete players to shortlist.</li>
</ul>

To produce AI predictions wes deployed the Kmeans library using NodeJS language. <br>
To receive real-time notification was deployed the Socket.io library using NodeJS language. <br>

## Getting Started <a name = "getting_started"></a>

This repository link will get you a copy of the project up and running on your local machine for development and testing purposes.

```
git clone https://github.com/ananya-collection/AI_Football_Scout.git
```

### Prerequisites

The application is using <b>MongoDB</b>. To run it you should add IP address to whitelist in User Interface MongoDB.

Please use credentials below to login to MongoDB UI:
```
account: s223306781@deakin.edu.au
password: myuniversityproject
```

For Providing payments please add real Stripe API code! <b> Without Stripe API token payments don't work.</b> <br>
BE CAREFUL with sharing API token, even test environment can be assessed by real API code, which leads to linked to banking account.

Once you get the Secret and Publishable Key from your stripe account. Set up a  .env file and set Publishable_Key to your publishable key and Secret_Key to your secret key.


## Running the application <a name = "run"></a>

Node project is installed in the "website" folder, to run the application please:

1. Go to website folder in already cloned repo using statement 
```
cd \AI_Football_Scout\website
```
in command shell.

2. Please enter the command to start the application
```
node . 
```  
in command shell to start application.

3. Website application sends a message in the console that it started, 
please open the browser and visit the link http://localhost:3000/ which will display the homepage. 

4. To login to the website to access the main part of the application use the following details,
username: bohdan@test.com
password: 12345

## Running the unit tests <a name = "tests"></a>

Project is using Mocha and Chai libraries for unit testing procedure. 
To start unit testing please input the command in the project folder. 

```
npm test
```

## Running the end to end tests <a name = "tests"></a>

Project is using Cypress for end to end testing.
To start unit testing please input the command in the project folder. 

```
npm run e2e
```

## Docummentation <a name = "documentation"></a>

Project documentation links with website site map, prototype, backend structure with APIs and MongodB schemas.

1. Website Site Map link https://www.figma.com/proto/S3c6SQUlU5uIpOVhQ0cpiT/AI-Football-Scout-Application-Design?node-id=1-2&scaling=scale-down&mode=design&t=iEeAUb5KqPk0vaOp-1
2. API Structure link https://www.figma.com/proto/2WmoTOSpwpGIXW0OYpbGdW/AI-Football-Scout-Hi-Fi-prototype?type=design&node-id=1-2&t=MA6VA2p4iz4gG0P6-1&scaling=min-zoom&page-id=0%3A1&mode=design
3. Website prototyoe link https://www.figma.com/proto/bC4ONzLpMWTlRKlNNQX0ao/Blog%2CContact-Us%2CAbout%2CSubscription-page?type=design&node-id=1-2&t=aJr9XmIizacndUxb-1&scaling=min-zoom&page-id=0%3A1&mode=design


## Python data collection and prototyping <a name = "python"></a>

Folder "data collection and model prototype" contains Python scripts:
<li>Data collection, transformation and aggregation was done using Python script <b>dataSyncScript.py</b>
and paid API <i>https://www.api-football.com/</i> as data source. </li>
<li>Initial Kmeans prototype was developed using scikit-learn library in Python script <b>KmeansPythonPrototype.py</b>.</li>

## Authors <a name = "authors"></a>

Team 11.  Unit SIT725.  
- [@vishnu](https://github.com/gokhanpicgeta) - Visnu Prasad 222192143
- [@bohdan](https://github.com/blaz2f) - Bohdan Tymoshenko 223306781
- [@ananya](https://github.com/ananya-collection) - Ananya Krishnan 222625051 
- [@muhammad](https://github.com/Sufian-code) - Muhammad Sufian Javid 223511433
- [@mallikarjuna](https://github.com/ArjunReddy2304) - Mallikarjuna Reddy Karasani 223511433








