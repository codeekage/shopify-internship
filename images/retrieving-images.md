# Retrieving Images

{% api-method method="get" host="{{BASE\_URL}}" path="/v1/images" %}
{% api-method-summary %}
Get User Images 
{% endapi-method-summary %}

{% api-method-description %}
This endpoint retrieves images of a specific users, using the user's token `{{ACCESS_TOKEN}}`.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authorization" type="string" required=true %}
Bearer {{ACCESS\_TOKEN}}
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Images of the  currently logged in user.
{% endapi-method-response-example-description %}

```
{
    "success": true,
    "data": [
        {
            "_id": "600442eaff8b780015a7650a",
            "price": 10000,
            "discount": 10,
            "permission": "private",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "testimage",
            "description": "imagemake",
            "createdAt": "2021-01-17T14:00:10.640Z",
            "updatedAt": "2021-01-17T14:00:10.640Z",
            "__v": 0
        },
        {
            "_id": "60044653ff8b780015a7650b",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "testpublic",
            "description": "imagemake",
            "createdAt": "2021-01-17T14:14:43.907Z",
            "updatedAt": "2021-01-17T14:14:43.907Z",
            "__v": 0
        },
        {
            "_id": "60044a13ff8b780015a7650c",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "testpubc",
            "description": "imagemake",
            "createdAt": "2021-01-17T14:30:43.628Z",
            "updatedAt": "2021-01-17T14:30:43.628Z",
            "__v": 0
        },
        {
            "_id": "60044a4aff8b780015a7650d",
            "price": 10000,
            "discount": 10,
            "permission": "private",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "testprivate",
            "description": "imagemake",
            "createdAt": "2021-01-17T14:31:38.373Z",
            "updatedAt": "2021-01-17T14:31:38.373Z",
            "__v": 0
        },
        {
            "_id": "60044ab6ff8b780015a7650e",
            "price": 10000,
            "discount": 10,
            "permission": "private",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "testpee",
            "description": "imagemake",
            "createdAt": "2021-01-17T14:33:26.985Z",
            "updatedAt": "2021-01-17T14:33:26.985Z",
            "__v": 0
        },
        {
            "_id": "60044d0ad2ec840015669e18",
            "price": 10000,
            "discount": 10,
            "permission": "private",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "testee",
            "description": "imagemake",
            "createdAt": "2021-01-17T14:43:22.151Z",
            "updatedAt": "2021-01-17T14:43:22.151Z",
            "__v": 0
        },
        {
            "_id": "60044f1cd2ec840015669e19",
            "price": 10000,
            "discount": 10,
            "permission": "private",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "testy",
            "description": "imagemake",
            "createdAt": "2021-01-17T14:52:12.440Z",
            "updatedAt": "2021-01-17T14:52:12.440Z",
            "__v": 0
        },
        {
            "_id": "6004504628713d0015c74d29",
            "price": 10000,
            "discount": 10,
            "permission": "private",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "teyyyy",
            "description": "imagemake",
            "cloudinary": {
                "public_id": "shopify_internship/mfkzoyng2hkt1rstqfcm",
                "url": "http://res.cloudinary.com/dhd3sqboy/image/private/s--TY7A2bvz--/v1610895430/shopify_internship/mfkzoyng2hkt1rstqfcm.jpg",
                "secure_url": "https://res.cloudinary.com/dhd3sqboy/image/private/s--TY7A2bvz--/v1610895430/shopify_internship/mfkzoyng2hkt1rstqfcm.jpg",
                "signature": "e665fcd82524798c73c37c3610149ce3a2b22121",
                "format": "jpg"
            },
            "createdAt": "2021-01-17T14:57:10.774Z",
            "updatedAt": "2021-01-17T14:57:10.774Z",
            "__v": 0
        },
        {
            "_id": "6004505928713d0015c74d2a",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "toooyyy",
            "description": "imagemake",
            "createdAt": "2021-01-17T14:57:29.967Z",
            "updatedAt": "2021-01-17T14:57:29.967Z",
            "__v": 0
        },
        {
            "_id": "6004506528713d0015c74d2b",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "ffoooyyy",
            "description": "imagemake",
            "createdAt": "2021-01-17T14:57:41.642Z",
            "updatedAt": "2021-01-17T14:57:41.642Z",
            "__v": 0
        },
        {
            "_id": "6004507228713d0015c74d2c",
            "price": 10000,
            "discount": 10,
            "permission": "private",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "ffoooy",
            "description": "imagemake",
            "createdAt": "2021-01-17T14:57:54.020Z",
            "updatedAt": "2021-01-17T14:57:54.020Z",
            "__v": 0
        },
        {
            "_id": "600453fe28713d0015c74d2d",
            "price": 10000,
            "discount": 10,
            "permission": "private",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "frroooy",
            "description": "imagemake",
            "createdAt": "2021-01-17T15:13:02.087Z",
            "updatedAt": "2021-01-17T15:13:02.087Z",
            "__v": 0
        },
        {
            "_id": "6004542a28713d0015c74d2e",
            "price": 10000,
            "discount": 10,
            "permission": "private",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "lllooy",
            "description": "imagemake",
            "createdAt": "2021-01-17T15:13:46.642Z",
            "updatedAt": "2021-01-17T15:13:46.642Z",
            "__v": 0
        },
        {
            "_id": "600456947cfa200015b943b4",
            "price": 10000,
            "discount": 10,
            "permission": "private",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "llooy",
            "description": "imagemake",
            "cloudinary": {
                "public_id": "shopify_internship/xvnuwezbiezpraxx2i67",
                "url": "http://res.cloudinary.com/dhd3sqboy/image/private/s--ejuQRYUF--/v1610897044/shopify_internship/xvnuwezbiezpraxx2i67.jpg",
                "secure_url": "https://res.cloudinary.com/dhd3sqboy/image/private/s--ejuQRYUF--/v1610897044/shopify_internship/xvnuwezbiezpraxx2i67.jpg",
                "signature": "6f58af10d70bccc50d47c1b60d281f59d70b4c20",
                "format": "jpg"
            },
            "createdAt": "2021-01-17T15:24:04.771Z",
            "updatedAt": "2021-01-17T15:24:04.771Z",
            "__v": 0
        },
        {
            "_id": "600456ab7cfa200015b943b5",
            "price": 10000,
            "discount": 10,
            "permission": "private",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "llooyy",
            "description": "imagemake",
            "createdAt": "2021-01-17T15:24:27.007Z",
            "updatedAt": "2021-01-17T15:24:27.007Z",
            "__v": 0
        },
        {
            "_id": "600456dd92281c0015ec3288",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "llootyy",
            "description": "imagemake",
            "cloudinary": {
                "public_id": "shopify_internship/zomnhordhtywbm5jgufa",
                "url": "http://res.cloudinary.com/dhd3sqboy/image/private/s--O2LmEBXR--/v1610897116/shopify_internship/zomnhordhtywbm5jgufa.jpg",
                "secure_url": "https://res.cloudinary.com/dhd3sqboy/image/private/s--O2LmEBXR--/v1610897116/shopify_internship/zomnhordhtywbm5jgufa.jpg",
                "signature": "2320c25954df63bb346aada0b431dcf1eb2346e9",
                "format": "jpg"
            },
            "createdAt": "2021-01-17T15:25:17.563Z",
            "updatedAt": "2021-01-17T15:25:17.563Z",
            "__v": 0
        },
        {
            "_id": "600456ec92281c0015ec3289",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "lloootyy",
            "description": "imagemake",
            "createdAt": "2021-01-17T15:25:32.202Z",
            "updatedAt": "2021-01-17T15:25:32.202Z",
            "__v": 0
        },
        {
            "_id": "6004576875325e711752391a",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "lloorrotyy",
            "description": "imagemake",
            "cloudinary": {
                "public_id": "shopify_internship/fwbdandvjmvh0iceligz",
                "url": "http://res.cloudinary.com/dhd3sqboy/image/private/s--eQopMOzG--/v1610897255/shopify_internship/fwbdandvjmvh0iceligz.jpg",
                "secure_url": "https://res.cloudinary.com/dhd3sqboy/image/private/s--eQopMOzG--/v1610897255/shopify_internship/fwbdandvjmvh0iceligz.jpg",
                "signature": "f93f17905cfb4b4f128d6b590218d2cbc7062ded",
                "format": "jpg"
            },
            "createdAt": "2021-01-17T15:27:36.092Z",
            "updatedAt": "2021-01-17T15:27:36.092Z",
            "__v": 0
        },
        {
            "_id": "6004577675325e711752391b",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "llooeerotyy",
            "description": "imagemake",
            "createdAt": "2021-01-17T15:27:50.700Z",
            "updatedAt": "2021-01-17T15:27:50.700Z",
            "__v": 0
        },
        {
            "_id": "600457ccb8edc871b14764ab",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "llooeeiiirotyy",
            "description": "imagemake",
            "cloudinary": {
                "public_id": "shopify_internship/mpaviwlm1izhu3m9xyo1",
                "url": "http://res.cloudinary.com/dhd3sqboy/image/private/s--ET2k56Aj--/v1610897356/shopify_internship/mpaviwlm1izhu3m9xyo1.jpg",
                "secure_url": "https://res.cloudinary.com/dhd3sqboy/image/private/s--ET2k56Aj--/v1610897356/shopify_internship/mpaviwlm1izhu3m9xyo1.jpg",
                "signature": "44ed15ec97227f64cdae70405acef9ed5fbd6da0",
                "format": "jpg"
            },
            "createdAt": "2021-01-17T15:29:16.761Z",
            "updatedAt": "2021-01-17T15:29:16.761Z",
            "__v": 0
        },
        {
            "_id": "600457ebb8edc871b14764ac",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "llooeeiiiirotyy",
            "description": "imagemake",
            "createdAt": "2021-01-17T15:29:47.159Z",
            "updatedAt": "2021-01-17T15:29:47.159Z",
            "__v": 0
        },
        {
            "_id": "600459650aed86722309ae01",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "llooeeiirotyy",
            "description": "imagemake",
            "cloudinary": {
                "public_id": "shopify_internship/pjeko0i2fyp0zjchotlp",
                "url": "http://res.cloudinary.com/dhd3sqboy/image/private/s--VMBCGIJR--/v1610897764/shopify_internship/pjeko0i2fyp0zjchotlp.jpg",
                "secure_url": "https://res.cloudinary.com/dhd3sqboy/image/private/s--VMBCGIJR--/v1610897764/shopify_internship/pjeko0i2fyp0zjchotlp.jpg",
                "signature": "648868111ef0ff54c68c909f99885b8d028ed57f",
                "format": "jpg"
            },
            "createdAt": "2021-01-17T15:36:05.323Z",
            "updatedAt": "2021-01-17T15:36:05.323Z",
            "__v": 0
        },
        {
            "_id": "600459730aed86722309ae02",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "llooeirotyy",
            "description": "imagemake",
            "cloudinary": {
                "public_id": "shopify_internship/mvn2zkdqf00d71fkt2an",
                "url": "http://res.cloudinary.com/dhd3sqboy/image/private/s--OPfCEmF4--/v1610897778/shopify_internship/mvn2zkdqf00d71fkt2an.jpg",
                "secure_url": "https://res.cloudinary.com/dhd3sqboy/image/private/s--OPfCEmF4--/v1610897778/shopify_internship/mvn2zkdqf00d71fkt2an.jpg",
                "signature": "1a2340eceb027f16395f9872c3748e81294d24a5",
                "format": "jpg"
            },
            "createdAt": "2021-01-17T15:36:19.548Z",
            "updatedAt": "2021-01-17T15:36:19.548Z",
            "__v": 0
        },
        {
            "_id": "60045a8692281c0015ec328a",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "llorotyy",
            "description": "imagemake",
            "createdAt": "2021-01-17T15:40:54.982Z",
            "updatedAt": "2021-01-17T15:40:54.982Z",
            "__v": 0
        },
        {
            "_id": "60045ae26c04210015b77d8a",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "llorrtyy",
            "description": "imagemake",
            "cloudinary": {
                "public_id": "shopify_internship/qrjnhkedmwhmry7oaesr",
                "url": "http://res.cloudinary.com/dhd3sqboy/image/private/s--Zo39xDsk--/v1610898145/shopify_internship/qrjnhkedmwhmry7oaesr.jpg",
                "secure_url": "https://res.cloudinary.com/dhd3sqboy/image/private/s--Zo39xDsk--/v1610898145/shopify_internship/qrjnhkedmwhmry7oaesr.jpg",
                "signature": "49e477904928b3f802ddad116ad34028a7f20308",
                "format": "jpg"
            },
            "createdAt": "2021-01-17T15:42:26.356Z",
            "updatedAt": "2021-01-17T15:42:26.356Z",
            "__v": 0
        },
        {
            "_id": "60045aea6c04210015b77d8b",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "llorrtddyy",
            "description": "imagemake",
            "cloudinary": {
                "public_id": "shopify_internship/kmbo163qolcwvoqbo7u7",
                "url": "http://res.cloudinary.com/dhd3sqboy/image/private/s--mTpmtPth--/v1610898154/shopify_internship/kmbo163qolcwvoqbo7u7.jpg",
                "secure_url": "https://res.cloudinary.com/dhd3sqboy/image/private/s--mTpmtPth--/v1610898154/shopify_internship/kmbo163qolcwvoqbo7u7.jpg",
                "signature": "bde137d439e02de205d458ff4aafd7bb05e3184d",
                "format": "jpg"
            },
            "createdAt": "2021-01-17T15:42:34.993Z",
            "updatedAt": "2021-01-17T15:42:34.993Z",
            "__v": 0
        },
        {
            "_id": "60045af56c04210015b77d8c",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "llorrwwwtddyy",
            "description": "imagemake",
            "cloudinary": {
                "public_id": "shopify_internship/xc4b4ccdwrnsr8vwpmay",
                "url": "http://res.cloudinary.com/dhd3sqboy/image/private/s--k3rlMnlE--/v1610898164/shopify_internship/xc4b4ccdwrnsr8vwpmay.jpg",
                "secure_url": "https://res.cloudinary.com/dhd3sqboy/image/private/s--k3rlMnlE--/v1610898164/shopify_internship/xc4b4ccdwrnsr8vwpmay.jpg",
                "signature": "bcdfc2ce599932defa9130b6b343d8561dd02810",
                "format": "jpg"
            },
            "createdAt": "2021-01-17T15:42:45.736Z",
            "updatedAt": "2021-01-17T15:42:45.736Z",
            "__v": 0
        },
        {
            "_id": "60045c2660ea0f001593ddd8",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "lognns",
            "description": "imagemake",
            "cloudinary": {
                "public_id": "shopify_internship/g2s0xf79tx529fbtvipg",
                "url": "http://res.cloudinary.com/dhd3sqboy/image/private/s--P2cKq-Ad--/v1610898469/shopify_internship/g2s0xf79tx529fbtvipg.jpg",
                "secure_url": "https://res.cloudinary.com/dhd3sqboy/image/private/s--P2cKq-Ad--/v1610898469/shopify_internship/g2s0xf79tx529fbtvipg.jpg",
                "signature": "a359086931ccaff43c7a15373e214d784910db32",
                "format": "jpg"
            },
            "createdAt": "2021-01-17T15:47:50.298Z",
            "updatedAt": "2021-01-17T15:47:50.298Z",
            "__v": 0
        },
        {
            "_id": "60045d60f2e9150015d9ef1d",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "logniins",
            "description": "imagemake",
            "cloudinary": {
                "public_id": "shopify_internship_staging/nepbvgm7ivpvyidf4svr",
                "url": "http://res.cloudinary.com/dhd3sqboy/image/private/s--8WRQT43V--/v1610898783/shopify_internship_staging/nepbvgm7ivpvyidf4svr.jpg",
                "secure_url": "https://res.cloudinary.com/dhd3sqboy/image/private/s--8WRQT43V--/v1610898783/shopify_internship_staging/nepbvgm7ivpvyidf4svr.jpg",
                "signature": "5ae259339d5e5fbc14aadf788ba44dc6a3e95f06",
                "format": "jpg"
            },
            "createdAt": "2021-01-17T15:53:04.630Z",
            "updatedAt": "2021-01-17T17:39:19.790Z",
            "__v": 0
        }
    ]
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="{{BASE\_URL}}" path="/v1/images/public" %}
{% api-method-summary %}
Get Public Images
{% endapi-method-summary %}

{% api-method-description %}
Returns an array of public images available for purchase. 
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authorization" type="string" required=true %}
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
    "data": [
        {
            "_id": "6001f173c05<image_id>",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "yddamaerofmystry",
            "description": "imagemake",
            "cloudinary": {
                "public_id": "<public_id>/pjtymbgp8iuoomjsxmb6",
                "url": "http://res.cloudinary.com/<cloud_name>/image/private/s--v_oQ0mTI--/v1610740081/<public_id>/pjtymbgp8iuoomjsxmb6.jpg",
                "secure_url": "https://res.cloudinary.com/<cloud_name>/image/private/s--v_oQ0mTI--/v1610740081/<public_iam/pjtymbgp8iuoomjsxmb6.jpg",
                "signature": "bf15055ee3ae1<signature>",
                "format": "jpg"
            },
            "createdAt": "2021-01-15T19:48:03.051Z",
            "updatedAt": "2021-01-15T19:48:03.051Z",
            "__v": 0
        },
        {
            "_id": "60044653ff8b<image_id>",
            "price": 10000,
            "discount": 10,
            "permission": "public",
            "metadata": [
                "water",
                "tree",
                "falls"
            ],
            "name": "testpublic",
            "description": "imagemake",
            "cloudinary": {
                "public_id": "<public_id>/pjtymbgp8iuoomjsxmb6",
                "url": "http://res.cloudinary.com/<cloud_name>/image/private/s--v_oQ0mTI--/v1610740081/<public_id>/pjtymbgp8iuoomjsxmb6.jpg",
                "secure_url": "https://res.cloudinary.com/<cloud_name>/image/private/s--v_oQ0mTI--/v1610740081/<public_iam/pjtymbgp8iuoomjsxmb6.jpg",
                "signature": "bf15055ee3ae1<signature>",
                "format": "jpg"
            },
            "createdAt": "2021-01-17T14:14:43.907Z",
            "updatedAt": "2021-01-17T14:14:43.907Z",
            "__v": 0
        }
    ]
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="{{BASE\_URL}}" path="/v1/images/:imageId" %}
{% api-method-summary %}
Get Image by imageID
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="imageId" type="string" required=true %}
`60045d60f2e91<imageId>`
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
    "success": true,
    "data": {
        "_id": "60045d60f2e9150015d9ef1d",
        "price": 10000,
        "discount": 10,
        "permission": "public",
        "metadata": [
            "water",
            "tree",
            "falls"
        ],
        "userId": "6001f8f7eedcea14751553bc",
        "name": "logniins",
        "description": "imagemake",
        "imageStore": {
            "imageURL": "https://shopifybucket-staging.s3.amazonaws.com/VyBShJlYIK_1610898782758.peg",
            "imageVersion": "NaRonms8PD90KduZlxGMaZ7q8QnHMSEM",
            "eTag": "\"78a5427f3d828c1897939f84971b3f2b\""
        },
        "cloudinary": {
            "public_id": "shopify_internship_staging/nepbvgm7ivpvyidf4svr",
            "url": "http://res.cloudinary.com/dhd3sqboy/image/private/s--8WRQT43V--/v1610898783/shopify_internship_staging/nepbvgm7ivpvyidf4svr.jpg",
            "secure_url": "https://res.cloudinary.com/dhd3sqboy/image/private/s--8WRQT43V--/v1610898783/shopify_internship_staging/nepbvgm7ivpvyidf4svr.jpg",
            "signature": "5ae259339d5e5fbc14aadf788ba44dc6a3e95f06",
            "format": "jpg"
        },
        "createdAt": "2021-01-17T15:53:04.630Z",
        "updatedAt": "2021-01-17T15:53:04.630Z",
        "__v": 0
    }
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

