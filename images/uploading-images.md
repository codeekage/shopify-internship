# Uploading Images

{% api-method method="post" host="{{BASE\_URL}}" path="/v1/images/upload?" %}
{% api-method-summary %}
Upload an image
{% endapi-method-summary %}

{% api-method-description %}
The endpoint allows you upload an image. All public images are viewable by all users and are stored with `shopify_icon` watermarks, which are automatically removed when purchasing the image.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authorization" type="string" required=true %}
Bearer `{{ACCESS_TOKEN}}`
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-query-parameters %}
{% api-method-parameter name="permission" type="string" required=true %}
enums: \[`private`, `public`\]
{% endapi-method-parameter %}

{% api-method-parameter name="price" type="number" required=true %}
selling price for an image
{% endapi-method-parameter %}

{% api-method-parameter name="discount" type="number" required=true %}
discount percentage for your image.  
`default 0`
{% endapi-method-parameter %}

{% api-method-parameter name="name" type="string" required=true %}
a unique name for your image
{% endapi-method-parameter %}

{% api-method-parameter name="metadata" type="string" required=true %}
separated with commas. `eg: car,yellow,etc`
{% endapi-method-parameter %}

{% api-method-parameter name="description" type="string" required=true %}
description about the image
{% endapi-method-parameter %}

{% api-method-parameter name="watermark" type="boolean" required=true %}
required when permission is private.   
default `false`
{% endapi-method-parameter %}
{% endapi-method-query-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=201 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
    "success": true,
    "data": [
        {
            "price": 10000,
            "discount": 10,
            "permission": "private",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "_id": "600442eaff8b7<image_id>",
            "name": "testimage",
            "description": "imagemake",
            "imageStore": {
                "imageURL": "https://s3-bucket.us-east-2.amazonaws.com/s3.peg",
                "imageVersion": "McvljgpYI11",
                "eTag": "\"78a5427f3d828"\"
            },
            "createdAt": "2021-01-17T14:00:10.640Z",
            "updatedAt": "2021-01-17T14:00:10.640Z",
            "__v": 0
        }
    ]
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}



