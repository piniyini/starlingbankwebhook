# Starling bank webhook
Personal webhook using NodeJS with Lambda for Starling bank

You can use this script to get the webhook values and progress to the next step (add to db or flat file etc).

Remember to get the secret key from the Starling dashboard and add to the Lambda environment, I have called the variable webhookSecret.

Also you'll need to add API Gateway as a trigger and use this URL as the webhook.

I hope you find this useful.
