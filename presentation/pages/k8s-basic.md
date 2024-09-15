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
--- 

# Hierarchy
Cluster -> Namespaces -> Deployment -> Pod -> Container

<Excalidraw
  drawFilePath="/drawings/k8s-hierarchy.excalidraw"
  class="w-4/5 mx-auto"
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


---
level: 2
layout: two-cols
class: first:mr-4
---

# Namespaces

_Namepaces_ provide a mechanism for isolating groups of resources within a single cluster. 

Namespace-based scoping is applicable only for namespaced objects (e.g. `Deployments`, `Services`, etc.) and not for cluster-wide objects (e.g. `StorageClass`, `Nodes`, `PersistentVolumes`, etc.).

Use `kubectl get namespace` to see all namesspaces.

For each `kubectl` command you need to tell it what namespace to use with `--namespace=<namespace>`,
e.g. `kubectl get pods --namespace=networx`

Set your namespace for all requests:
`kubectl config set-context --current --namespace=<namespace>`

::right::

### Manifest

Here a example namespace manifest `networx.namespace.yaml`:
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: networx
```

<v-click>

Apply it with `kubectl apply -f networx.namespace.yaml`

</v-click>

<v-click>

Then use it in the `metadata` of resources:

```yaml
kind: Pod
apiVersion: v1
metadata:
  # ...
  namespace: networx
# ...
```

</v-click>

---
level: 2
layout: two-cols
class: first:mr-4
---

# Pods

_Pods_ are the smallest deployable units of computing that you can create and manage in Kubernetes.

A Pod (as in a pod of whales or pea pod) is a group of one or more containers.

<Excalidraw
  drawFilePath="/drawings/k8s-pod.excalidraw"
  :darkMode="false"
  :background="true" />


::right::

### Manifest
Here a example namespace manifest `echo-server.pod.yaml`:
````md magic-move {lines:true}
```yaml{*|1|3-4|6|7-8}
kind: Pod
apiVersion: v1
metadata:
  name: my-echo-server
spec:
  containers:
    - name: echo-server-container
      image: 'kicbase/echo-server:1.0'
```
```yaml{9-10}
kind: Pod
apiVersion: v1
metadata:
  name: my-echo-server
spec:
  containers:
    - name: echo-server-container
      image: 'kicbase/echo-server:1.0'
      ports:
        - containerPort: 8080
```
```yaml{5-6|*}
kind: Pod
apiVersion: v1
metadata:
  name: my-echo-server
  labels:
    app: echo-server-app
spec:
  containers:
    - name: echo-server-container
      image: 'kicbase/echo-server:1.0'
      ports:
        - containerPort: 8080
```
````

<v-click>

then we can apply this with `kubectl apply -f echo-server.pod.yaml`

</v-click>


---
level: 2
layout: two-cols
class: first:mr-4
---

# Services

A Service expose a network app that is running on one or more Pods in your cluster.

### Service Type
The main types are:
- **ClusterIP** _(default)_: Reachable from within the cluster. 
- **NodePort**: Exposes the Service on each Node's IP at a static port.
- **LoadBalancer**: Exposes the Service externally using an external load balancer. 

::right::

### Manifest
Let's create our `echo-server.service.yaml`:
````md magic-move {lines: true}
```yaml{*|1|4}
kind: Service
apiVersion: v1
metadata:
  name: my-echo-service
```
```yaml{6-7|8-10|7,10}
kind: Service
apiVersion: v1
metadata:
  name: my-echo-service
spec:
  selector:
    app: echo-server-app
  ports:
    - port: 1234
      targetPort: 8080
```
```yaml{6,12}
kind: Pod
apiVersion: v1
metadata:
  name: my-echo-server
  labels:
    app: echo-server-app
spec:
  containers:
    - name: echo-server-container
      image: 'kicbase/echo-server:1.0'
      ports:
        - containerPort: 8080
```
```yaml
kind: Service
apiVersion: v1
metadata:
  name: my-echo-service
spec:
  selector:
    app: echo-server-app
  ports:
    - port: 1234
      targetPort: 8080
```
````

<v-click>

deploy with `kubectl apply -f echo-server.service.yaml`

expose to `localhost:3000` with
```sh
kubectl port-forward service/my-echo-service 3000:1234
```

</v-click>

---
level: 2
layout: two-cols
class: first:mr-4
---

# ReplicaSets

A ReplicaSet's purpose is to maintain a stable set of replica Pods running at any given time. As such, it is often used to guarantee the availability of a specified number of identical Pods.

<img src="https://www.cncf.io/wp-content/uploads/2020/07/phippy-goes-to-the-zoo-06-1-1024x621.jpg" />

::right::

### Manifest
````md magic-move {lines: true}
```yaml{*|2}
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: echo-server-rs
```
```yaml{*|6|7-9}
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: echo-server-rs
spec:
  replicas: 3
  selector:
    matchLabels:
      app: echo-server-app
```
```yaml{*|10|11-}
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: echo-server-rs
spec:
  replicas: 3
  selector:
    matchLabels:
      app: echo-server-app
  template:
    metadata:
      name: my-echo-server
      labels:
        app: echo-server-app
    spec:
      containers:
        - name: echo-server-container
          image: 'kicbase/echo-server:1.0'
          ports:
            - containerPort: 8080
```
```yaml
kind: Pod
apiVersion: v1
metadata:
  name: my-echo-server
  labels:
    app: echo-server-app
spec:
  containers:
    - name: echo-server-container
      image: 'kicbase/echo-server:1.0'
      ports:
        - containerPort: 8080
```
```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: echo-server-rs
spec:
  replicas: 3
  selector:
    matchLabels:
      app: echo-server-app
  template:
    metadata:
      name: my-echo-server
      labels:
        app: echo-server-app
    spec:
      containers:
        - name: echo-server-container
          image: 'kicbase/echo-server:1.0'
          ports:
            - containerPort: 8080
```
````

---
level: 2
layout: two-cols
class: first:mr-4
---

# Deployments

A _Deployment_ provides declarative updates for `Pods` and `ReplicaSets`.

You describe a _desired state_ in a Deployment, and the Deployment Controller changes the actual state to the desired state at a controlled rate.

::right::

### Manifest
Looks alot like a ReplicaSet:

````md magic-move {lines: true}
```yaml{*|2|6|7-9|10-|*}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: echo-server-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: echo-server-app
  template:
    metadata:
      name: my-echo-server
      labels:
        app: echo-server-app
    spec:
      containers:
        - name: echo-server-container
          image: 'kicbase/echo-server:1.0'
          ports:
            - containerPort: 8080
```
````

---
level: 2
---

### Rollout Update
You can change your deployment manifest, 
e.g. change the image tag from `v1` to `v2`, and run `kubectl apply` again.
This will trigger a rollout update, creating a new ReplicaSet and terminating the old one.

Run `kubectl rollout status deployment/<deployment-name>` to see the status.

### Rollout History
You can run `kubectl get rs` to see all replica sets, here you can see also the old ReplicaSets that was used by a deployment.

You can see all revisions of a deployment with 
```sh
kubectl rollout history deployment/<deployment-name>
```

---
level: 2
---

### Rollback
You can rollback to previous version with this command:

```sh
kubectl rollout undo deployment/deployment-name
# You can add `--to-revision=n` to rollback to specific version.
kubectl rollout undo deployment/deployment-name --to-revision=2
```

<br/>

### Scale Deployment
You can scale or shrink the deployment with the following command:
```sh
kubectl scale deployment/deployment-name --replicas=10
```

---
level: 2
layout: two-cols
class: first:mr-4
hide: true
---

# Volumes

Coming Soon...

---
level: 2
layout: two-cols
class: first:mr-4
hide: true
---

# ConfigMap

Coming Soon...

---
level: 2
layout: two-cols
class: first:mr-4
hide: true
---

# Secrets

Coming Soon...

---
level: 2
layout: two-cols
class: first:mr-4
hide: true
---

# Ingress & Gateway

Coming Soon...

---
level: 2
layout: two-cols
class: first:mr-4
hide: true
---

# Jobs & CronJobs

Coming Soon...

---
level: 2
layout: two-cols
class: first:mr-4
hide: true
---

# CRDs

Coming Soon...

use `echo -n "your-password" | base64`
