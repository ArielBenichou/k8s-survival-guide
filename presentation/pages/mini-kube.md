---
layout: cover
background: https://images.unsplash.com/photo-1506994011460-5482746d30a1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
class: text-center
---

# MiniKube Workshop

Let's start kubing.

<div class="pt-12">
  <a target="_blank" href="https://minikube.sigs.k8s.io/docs/start" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    See Documentation <mdi-file-document-outline class="inline"/>
  </a>
</div>

---
level: 2
---

# Setup Tools

<v-clicks>

1. Install minikube for your platform of choice:
   - Homebrew 🍺(Mac): `brew install minikube`
   - Chocolatey 🍫(Windows): `choco install minikube`
   - Other: [https://minikube.sigs.k8s.io/docs/start]
2. Install `kubectl`:
   - Homebrew 🍺(Mac): `brew install kubectl`
   - Chocolatey 🍫(Windows): `choco install kubernetes-cli`
   - Other: [https://kubernetes.io/docs/tasks/tools/#kubectl]
3. It is recommend to set `k` as an alias for `kubectl`.
4. Start MiniKube with `minikube start`
5. You should get a non-empty result from `kubectl get po -A`

</v-clicks>

<v-click>

Even though we will use the terminal to issue commands, you can open the k8s dashboard with: `minikube dashboard`


</v-click>

<v-after>

**Note:** you can stop and clean minikube with: `minikube stop` and `minikube delete --all`

</v-after>

---
level: 2
---

# Our First Pod

Let's deploy an "Echo Server" just to test the installation.

```sh
# Create a deployment of a simple server inside our cluster and expose it
kubectl create deployment hello-minikube --image=kicbase/echo-server:1.0
kubectl expose deployment hello-minikube --type=LoadBalancer --port=8080
# minikube give us a easy way to expose a service to our localhost
minikube service hello-minikube
# when done
kubectl delete deployment hello-minikube
```

Now you should get an output like that:
```
🏃  Starting tunnel for service hello-minikube.
|-----------|-----------------|-------------|------------------------|
| NAMESPACE |      NAME       | TARGET PORT |          URL           |
|-----------|-----------------|-------------|------------------------|
| default   | hello-minikube  |             | http://127.0.0.1:63263 |
|-----------|-----------------|-------------|------------------------|
🎉  Opening service default/hello-minikube in default browser...
```

You can also `curl localhost:63263` and get the same echo response.

---
level: 2
---

# Deploy YAML Manifest

We will mainly use the `apply` command to deploy yaml manifests.
```sh
# deploy one file
kubectl apply -f ./pod.yaml
# deploy all yaml file
kubectl apply -f ./*.yaml
# prune everthing and deploy a resource (Hard Sync)
kubectl apply -f --prune ./pod.yaml
```
