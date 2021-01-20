# Inventory

{% api-method method="get" host="{{BASE}}" path="/v1/transact/history" %}
{% api-method-summary %}
Get User Inventory
{% endapi-method-summary %}

{% api-method-description %}
This endpoint allows you to get free cakes.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authorization" type="string" required=true %}
`Bearer {{ACCESS_TOKEN}}`
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
User's Inventory
{% endapi-method-response-example-description %}

```
{
    "success": true,
    "data": {
        "inventory": [
            {
                "_id": "60046766f2e9150015d9ef26",
                "amount": 100,
                "imageId": "60045d60f2e9150015d9ef1d",
                "userId": "60046302f2e9150015d9ef1f",
                "type": "purchased",
                "createdAt": "2021-01-17T16:35:50.474Z",
                "updatedAt": "2021-01-17T16:35:50.474Z",
                "__v": 0
            },
            {
                "_id": "6004856f65a08c7d0d66238a",
                "amount": 100,
                "imageId": "60045d60f2e9150015d9ef1d",
                "userId": "60046302f2e9150015d9ef1f",
                "type": "purchased",
                "createdAt": "2021-01-17T18:43:59.126Z",
                "updatedAt": "2021-01-17T18:43:59.126Z",
                "__v": 0
            }
        ]
    }
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

