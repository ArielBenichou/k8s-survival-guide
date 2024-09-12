---
layout: cover
background: https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
class: text-center
---

# Modern Overview of Cloud Infrastructure

Why on Earth do I need Kubernetes?

---
level: 2
---

# Let's Begin with a Server

Suppose we have a Node.js server, we want to deploy.

<v-clicks class="ml-8">

1. We will need to buy a server rack and hardware.
2. Install a Linux OS.
3. Install all dependencies. (Node.js, npm install, etc...)
4. Run the Server.

</v-clicks>

<v-click>
Phew...
</v-click>
<v-click>
Well, we have modern tools that can help us with this already:
</v-click>
<v-clicks class="ml-8">

1. Rent a Linux Server from AWS.
2. Install Docker Daemon.
3. Build an Docker Image of our Node.js server.
4. Run this Image on our AWS machine.

</v-clicks>

<v-click>
That's better. (we have even better tools, but I digress)
</v-click>

---
level: 2
---
# We missing some key features

Ok, so we have a Node.js server deployed, but we missing some important production features:

<v-clicks class="ml-8">

- Configuration & Secrets managment.
- Networking with other Services and Database.
- Presisting of Storage.
- Monitoring and Logging.
- and more...

</v-clicks>

---
level: 2
---

# ...and scaling

We also need our Node.js server up and running at all time:

<v-clicks class="ml-8">

- A process that restart the server if he crashes
- Automatic Vertical & Horizontal Scaling
- Load Balancing
- Rolling Update the instances to a new version.

</v-clicks>

---
level: 2
---
# So Why Kubernetes?

So it look like I can just use modern cloud provider tools, why do I need k8s?

Each cloud provider give you different tools to solve those issues.

But **Kubernetes** give you a **cloud agnostic** abstraction to do it. so you could use the same kubernetes on AWS, Google Cloud, Azure... or even you own in-house servers.

<div>
On top of that k8s is using a
  <span v-mark="{ at: 1, color: 'red', type: 'underline' }">
    Declarative
  </span> 
  <span v-mark="{ at: 3, color: 'orange', type: 'underline' }">
    Infrastructure as Code
  </span>
  , meaning that 
  <b>
    no matter what is the current state
  </b> 
  of your cloud you will get your desired result, and you can 
  <b>
    keep everything under a git repository
  </b> 
  and deploy the changes automaticly with a CI/CD pipeline or on which platform you want to deploy it.
</div>

