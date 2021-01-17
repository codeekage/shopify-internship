# Welcome to Shopify Image Repository

## Base URLs

* [https://shopify-internship-staging.herokuapp.com](https://shopify-internship-staging.herokuapp.com)
* [https://shopify-internship.herokuapp.com](https://shopify-internship-staging.herokuapp.com)

{% api-method method="get" host="{{BASE\_URL}}" path="/v1/" %}
{% api-method-summary %}
Welcome
{% endapi-method-summary %}

{% api-method-description %}
This the root endpoint. Welcome! 
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Cake successfully retrieved.
{% endapi-method-response-example-description %}

```
Welcome to Shopify Image Repository
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}



