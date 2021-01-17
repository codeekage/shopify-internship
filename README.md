# Shopify Internship
## Task: Image Repository

Hey, Welcome 👋 . 

The project in this repository attempts to complete Shopify Internship using Node.js - Image Repository Task.

## The task attempted

 ### Add Image(s) to repository
    - one / bulk / enormous amount of images
    - private or public (permissions)
    - secure uploading and stored images

  ### SELL/BUY images
    - ability to manage inventory
    - set price
    - discounts
    - handle money
    
## Technologies
  - Node.js
  - Mongo
  - PayPal 
  - Cloudinary
  - AWS S3 Buckets
  - Heroku
  - Redis

######

> Diagram depicts some core functionalities of the application

###  Add Image(s)

![Upload Image](https://res.cloudinary.com/codeekagexdalia/image/upload/v1610790726/Adding_Images_ybx9eh.png)



                                Fig 1.0 Uploading Images to AWS S3 and Add Watermark with Cloudinary 

### Sell/Buy Image(s)
![Handle Money](https://res.cloudinary.com/codeekagexdalia/image/upload/v1610791099/handlemoney-Page-2_gffpix.png)

                                Fig 2.0 Handling Money and Generating Downloadable Link

##### Authentication 
> The application locks out Client's IPs after five (5) unsuccessful logins. Be careful when choosing a password and username.

### Running the application (Backend Service):

The application has no interactive frontend UI. Ergo, you'll need [PostMan](https://www.postman.com/downloads/) installed to run the service successfully.

Like to run locally? You'll need more than PostMan. Kindly install
- Node.js
- Redis

### Install Dependencies
```shell 
  npm i
```

### Start Local Server

```shell
  npm run server 
```

or 

```shell
  npm start
```

> Make sure you add `.env` file in the root directory of the project else everything fails.
  You'll need to use your configurations and tokens for service depicted in `.env.example`. Some service includes [Cloudinary](https://cloudinary.com/documentation/node_integration), [AWS S3](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html), and [PayPal](https://developer.paypal.com/docs/integration/direct/payments/paypal-payments/).
  
  > *Please, kindly head over to the respective documentation and see how to obtain security credentials for the service.*

### PostMan

Here's a [PostMan Collection](https://www.getpostman.com/collections/2ea47ca12c438c2b6031) and [Environment](https://drive.google.com/drive/folders/1LwaosnNPtmSEcmcsFPE4P1ie5tiCYAU8?usp=sharing) to make your life a lot easier when running the service.

### API Resource

### Base URL 
- https://shopify-internship-staging.herokuapp.com (staging)
- https://shopify-internship.herokuapp.com (prod)
- http://localhost:9000/v1 (local)


### API Documentation 
- [Docs](https://shopifyinternship.gitbook.io/imagerepository/)
- [PostMan Docs](https://documenter.getpostman.com/view/2893258/TVzVhvcx#1ccbde2e-ba01-4831-862f-088da2527d8e)

### Having Troubles? 
  - Contact me via [email](mailto://agiriabrahamjunior@gmail.com) or [twitter](https://twitter.com/@codeekage) 
  - Open a ticket or a PR.  Thank you. ☕️ 
