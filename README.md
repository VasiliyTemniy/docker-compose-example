# docker-compose-example
Example app


to run, just 
```docker-compose up```
while in app dir

Redis cache applied.

Assuming port 80:
```
http://localhost       responses with static html with WebSocket. Time updates every minute with ws message.
http://localhost/time  responses with current time. Does not refresh the page, does not update the time.
```

P.S.
Static html is served from express, not from nginx; I hope this would not be considered as a big problem.