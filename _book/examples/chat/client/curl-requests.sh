printf "\nPOST Hello.\n"
curl -H 'Content-Type: application/json' --data-binary '{ "text": "Hello." }' http://localhost:3030/messages/
printf "\nPOST Hello again!\n"
curl -H 'Content-Type: application/json' --data-binary '{ "text": "Hello again!" }' http://localhost:3030/messages/
printf "\nPOST Anyone there?\n"
curl -H 'Content-Type: application/json' --data-binary '{ "text": "Anyone there?" }' http://localhost:3030/messages/