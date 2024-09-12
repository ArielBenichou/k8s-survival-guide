
# TODO

- Modern Overview of Cloud Infrastructure
  (What is the problem we trying to solve?)
  - let's say we have an app that we want to deploy, a node server.
  - we will buy a server, install linux, connect to the internet, install all the dependencies, install/run our server, expose it in the networking. and ta da!
  - well, now with cloud service i can just rent a fresh install linux server.
  - and with docker i can create a an image of my server, and deploy it easily (solving dependencies issues, and making it consistant across machines)
  - ok, nice! so why do we need a k8s? ohh because what if we need to create mulitple instance of our server and load balance them.
  - yes, we can do the previous step three time, and deploy a load balancer between them and it will work. but that's work.
  - also what happen if you have 15 microservice and each one need to have 3 replicas alive at each moment?
  - another issue, is what if the ip of services and load balancer changes? i need to do lots of work to maitain this cluster of serivces.
  - also you need to configure storage, so the data is saved __somewhere__ 
  - although we have lots of tools in each cloud service that help us solve those problem. k8s give us a **Cloud Agnostic** tool, so we can easily migrate between cloud providers.
  - ofcourse, there is more than load balancing and networking that k8s give you in a cloud agnostic way, also secret configuration, and ____.
  - k8s is also extensible and pluggable and you can find thrid party service and tools that you can easily integrate into you k8s cluster. 
- Docker Refrehser?
- K8s Basic (https://www.cncf.io/wp-content/uploads/2020/08/Phippy-Goes-To-The-Zoo.pdf)
  - Nodes, Workers & ControlPlane
  - Pods
  - Secrets
  - ReplicaSets, Deployments, DaemonSets
  - Ingress
  - CronJobs
  - CRD
  - Services
  - Storage
- MiniKube Installation
- create a demo node js app and react frontend
