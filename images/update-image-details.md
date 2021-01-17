# Update Image Details

{% api-method method="put" host="{{BASE\_URL}}" path="/v1/images/update/:imageId" %}
{% api-method-summary %}
Update Image 
{% endapi-method-summary %}

{% api-method-description %}
The endpoints allows you update details such as permission, name, price, etc., but not the image.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="imageId" type="string" required=true %}
the `imageId` to update its details
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-headers %}
{% api-method-parameter name="Authorization" type="string" required=true %}
Bearer `{{ACCESS_TOKEN}}`
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-body-parameters %}
{% api-method-parameter name="name" type="string" required=false %}
the image title
{% endapi-method-parameter %}

{% api-method-parameter name="permission" type="string" required=false %}
`enum:[private, public]`
{% endapi-method-parameter %}

{% api-method-parameter name="price" type="string" required=false %}
image price
{% endapi-method-parameter %}

{% api-method-parameter name="discount" type="number" required=false %}
discount in percentage.
{% endapi-method-parameter %}

{% api-method-parameter name="metadata" type="string" required=false %}
the image metadata separated with a comma. `eg: car,blue,totoya`
{% endapi-method-parameter %}

{% api-method-parameter name="description" type="string" required=false %}
the image description
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
    "success": true,
    "data": {
        "imageUpdate": {
            "imageStore": {
                "imageURL": "https://<s3>-staging.s3.amazonaws.com/<image>.peg",
                "imageVersion": "<version>",
                "eTag": "\"<eTag>\""
            },
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "_id": "60045d60f2e9150015d9ef1d",
            "userId": "<user_id",
            "name": "logniins",
            "description": "imagemake",
            "cloudinary": {
                "public_id": "<image_public_id>/nepbvgm7ivpvyidf4svr",
                "url": "http://res.cloudinary.com/<image_public_id>/image/private/s--8WRQT43V--/v1610898783/<image_public_id>/nepbvgm7ivpvyidf4svr.jpg",
                "secure_url": "https://res.cloudinary.com/<image_public_id>/image/private/s--8WRQT43V--/v1610898783/<image_public_id>/nepbvgm7ivpvyidf4svr.jpg",
                "signature": "<image_signature>",
                "format": "jpg"
            },
            "createdAt": "2021-01-17T15:53:04.630Z",
            "updatedAt": "2021-01-17T16:07:42.018Z",
            "__v": 0
        },
        "message": "Image [{\"permission\":\"public\"}] updated"
    }
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}



