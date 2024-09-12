---
layout: cover
background: https://images.unsplash.com/photo-1483717214777-e2baa10cf8e1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
class: text-center
---

# Kubernetes Basics

What it does and how it works?


---
level: 2
---

# Kubernetes Architecture

K8s is an abstraction over hardware.

If you would to create manually (i.e. without a cloud provider or a minikube) a kubernetes cluster - it will take a lot of work and knowledge!

Kubernetes by itself doesn't know which storage device or load balancer he need to create when asked.

**You need to configure k8s with lots of tools**

But luckily each cloud provider have a ready k8s integration with their services.

<Excalidraw
  drawFilePath="/drawings/k8s-archi.excalidraw"
  class="w-[600px]"
  :darkMode="false"
  :background="true" />

---
level: 2
layout: two-cols-header
---

# Nodes

We have Worker nodes and Master nodes.

::left::

### Master Node
The **Control Plane** is made off of master nodes and are responsable for: high availability, recovery from worker node failures, respond to increased demand for a pod, etc.

`kubectl` in fact send its commands to the Control Plane.

Without a fully functioning control plane, a cluster cannot make any changes to its current state, i.e. no new pods can be scheduled.

In a prod environment we will usually have 3 master nodes. [(read why)](https://www.siderolabs.com/blog/why-should-a-kubernetes-control-plane-be-three-nodes/) 

::right::

### Worker Node

Worker nodes are where our resources are deployed to.

We should look at the ensamble of all those nodes as a pool of resources.

We should declare what resources (e.g. server, frontend app, etc...) need to be deployed and how much of them we need, Kubernetes will handle where and when to deploy them.
