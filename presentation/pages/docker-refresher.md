---
layout: cover
background: https://plus.unsplash.com/premium_photo-1661847613093-bbb6d1c0f73a?q=80&w=2770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
class: text-center
---

# Docker Refresher

Shoo a da Container?

---
level: 2
layout: two-cols
---

# A Simple Example

Docker let's you build an **Image** for the application you want to later **Run** with the docker daemon.

Build your app with `docker build . -t my-app`

Run a container with the same image and expose the port 3000: `docker run -p 3000:3000 my-app`

If the image does not exist on your local machine it will be pull from the dockerhub registery.

<img src="https://1000logos.net/wp-content/uploads/2021/11/Docker-Logo-2013.png" class="h-40 mx-auto"
/>

::right::

Here an example `Dockerfile` that build a Node.js Server.
```{*}{lines:true,startLine:0}
# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm ci && \
    npm run build && \
    npm prune --production


EXPOSE 3000

CMD ["node", "/app/dist/index.js"]

```
