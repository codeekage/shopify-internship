# Buying Images

{% api-method method="post" host="{{BASE\_URL}}" path="/v1/transact/purchase/:imageId" %}
{% api-method-summary %}
Purchase Image
{% endapi-method-summary %}

{% api-method-description %}
To complete an image purchase, you'll need to open the link in responses object;`HTTP method` tagged `REDIRECT` in a browser and follow prompted steps.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="imageId" type="string" %}
`imageId` of the image to purchase.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-headers %}
{% api-method-parameter name="Authentication" type="string" required=true %}
Bearer `{{ACCESS_TOKEN}}`
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
    "success": true,
    "data": {
        "id": "PAYID-MACGGMQ48E20750FG2705549",
        "intent": "sale",
        "state": "created",
        "payer": {
            "payment_method": "paypal"
        },
        "transactions": [
            {
                "amount": {
                    "total": "100.00",
                    "currency": "USD",
                    "details": {
                        "subtotal": "100.00"
                    }
                },
                "description": "You are paying for image: 60045d60f2e9150015d9ef1d from malcomxx",
                "custom": "SHOPFY_IMG_06263153839227",
                "invoice_number": "77492859724",
                "soft_descriptor": "SIMG7974808",
                "payment_options": {
                    "allowed_payment_method": "INSTANT_FUNDING_SOURCE",
                    "recurring_flag": false,
                    "skip_fmf": false
                },
                "item_list": {
                    "items": [
                        {
                            "name": "logniins",
                            "sku": "1",
                            "price": "100.00",
                            "currency": "USD",
                            "quantity": 1
                        }
                    ]
                },
                "related_resources": []
            }
        ],
        "note_to_payer": "Thank you for your interest in this image. Please, contact us for further assistance",
        "create_time": "2021-01-17T16:17:54Z",
        "links": [
            {
                "href": "https://api.sandbox.paypal.com/v1/payments/payment/PAYID-MACGGMQ48E20750FG2705549",
                "rel": "self",
                "method": "GET"
            },
            {
                "href": "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-9BY2012792675570A",
                "rel": "approval_url",
                "method": "REDIRECT"
            },
            {
                "href": "https://api.sandbox.paypal.com/v1/payments/payment/PAYID-MACGGMQ48E20750FG2705549/execute",
                "rel": "execute",
                "method": "POST"
            }
        ]
    },
    "message": "created successfully"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% hint style="info" %}
You'll need a PayPal account to complete the step. Here's one provided for you to test with:`<email: sb-lzjyu4739119@personal.example.com>` `<password: |i+TB8N,>`
{% endhint %}

## Completing an Image Purchase

If your PayPal payment was successful, you'll be redirected to a page that looks like so:

![Complete image purchase.](../.gitbook/assets/screenshot-2021-01-17-at-17.31.02.png)

Kindly, copy the request above and paste request body.

{% api-method method="post" host="{{BASE\_URL}}" path="/v1/transact/process-payment" %}
{% api-method-summary %}
Process Payment
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authorization" type="string" required=true %}
Bearer `{{ACCESS_TOKEN}}`
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-body-parameters %}
{% api-method-parameter name="paymentId" type="string" required=false %}
`paymentId` from the redirect page
{% endapi-method-parameter %}

{% api-method-parameter name="payerId" type="string" required=true %}
`payerId` from the redirect page
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Get the watermark image download link from the response body.
{% endapi-method-response-example-description %}

```
{
    "success": true,
    "data": {
        "transaction": {
            "paidAmount": 100,
            "_id": "60046766f2e9150015d9ef28",
            "imageId": "60045d60f2e9150015d9ef1d",
            "metadata": {
                "sub_type": "purchase_image"
            },
            "transactionRef": "pyjjFIttzJ",
            "createdAt": "2021-01-17T16:35:50.444Z",
            "updatedAt": "2021-01-17T16:35:50.444Z",
            "__v": 0
        },
        "downloadLink": "https://api.cloudinary.com/v1_1/dhd3sqboy/image/download?timestamp=1610901351&public_id=shopify_internship_staging%2Femfe1uf3jduvuqbdw1ep&format=jpg&signature=0ea8c6b42d5d82e3a4e3dfc2052c4485143f35d0&api_key=969765432579286"
    },
    "message": "created successfully"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

