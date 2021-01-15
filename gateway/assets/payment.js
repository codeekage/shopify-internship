module.exports = ({ paymentId, PayerID }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shopify Internship</title>
</head>
<body style="margin: 0 auto; width: 100%; text-align: center;">
    <h1>Complete your journey 🚀</h1>
    <div>
      <h3>Use the details below to complete your payment request in PostMan</h3>
      <p>PaymentID: "${paymentId}"</p>
      <p>PayerID: "${PayerID}"</p>
    </div>
    <div>
      <p>You can also complete by copying and pasting</p>
      <code>
        {
          "paymentId": "${paymentId}",
          "payerId": "${PayerID}"
        }
      </code>
    </div>
</body>
</html>
`;
