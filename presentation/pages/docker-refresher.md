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

::right::

```{*}{lines:true,startLine:0}
# Dockerfile
FROM node

CMD ["a", "b"]
```
