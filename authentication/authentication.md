---
description: To use the API you need an authenticated account. Getting one is simple.
---

# Authentication

{% api-method method="post" host="{{BASE\_URL}}" path="/v1/auth/signup" %}
{% api-method-summary %}
Sign Up
{% endapi-method-summary %}

{% api-method-description %}
The endpoint allows you sign up for the service
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="email" type="string" required=true %}
a valid email address
{% endapi-method-parameter %}

{% api-method-parameter name="username" type="string" required=true %}
choose your preferred username
{% endapi-method-parameter %}

{% api-method-parameter name="password" type="string" required=true %}
password must be 8 characters long
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Account created.
{% endapi-method-response-example-description %}

```
{
    "success": true,
    "data": {
        "_id": "5ffd38ca<user_id>",
        "email": "example@example.com",
        "username": "yoda",
        "__v": 0
    },
    "message": "created successfully"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="{{BASE\_URL}" path="/v1/auth/login" %}
{% api-method-summary %}
Login
{% endapi-method-summary %}

{% api-method-description %}
On successful login, the endpoint generates an encrypted `access token` . Your access token lets you call the secured endpoints on the service. eg. uploading an image or purchasing an image.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="username" type="string" required=true %}
`unique username, created when signing up`
{% endapi-method-parameter %}

{% api-method-parameter name="password" type="string" required=true %}
`your secret password`
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Keep an eye out for the `token`. You'll need it to call secured endpoints.
{% endapi-method-response-example-description %}

```
 {
    "success": true,
    "data": {
        "_id": "5ffd38ca7195a1a7bf40e198",
        "email": "yoda@codeekage.com",
        "username": "yoda",
        "__v": 0,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWduYXR1cmUiOnsiaXYiOiJmZzZHenNRRDRWeTlZMWptaDdhZ3hnPT0iLCJjb250ZW50IjoiUUhvQWhvMWF6Qm9LWW1XZHVwMTJnSGlmVjBlNlYyQ1MifSwiaWF0IjoxNjEwNDQ4MTQ0LCJleHAiOjE2MTA1MzQ1NDQsInN1YiI6InVzZXIifQ.6c8Ma1JbugKUVUi-vMeVpWkbfN_RHYD9TiPrTHLrGUI",
        "expiresIn": 86400
    }
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% hint style="danger" %}
For security and to reduce too many password retries, your `IP address` is blocked after five \(5\) unsuccessful logins. For example, retrying with an invalid `password` or `username`.
{% endhint %}

