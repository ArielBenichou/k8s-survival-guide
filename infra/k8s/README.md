# K8s Files
Those are tested to work on MiniKube.

# Run
run the `init.sh` scirpt to bring up all the manifest in order

# Seed DB
SSH inside on of the backend pods:
```sh
kubectl exec --stdin --tty $(kubectl get pod -n=petworx -o name --no-headers=true | grep backend | head -n 1) -n=petworx -- /bin/sh
```
and run the script to seed the db:
```sh
node scripts/db-init-seed.js
```

# Expose
You need to expose one backend pod to localhost:8080
and expose one frontend pod to another port (frontend talk to localhost:8080 for backend)
```sh
kubectl port-forward deployment/backend 8080:3000 -n=petworx
kubectl port-forward deployment/frontend 3000:3000 -n=petworx
```

Even better you can run `minikube tunnel` to expose the load balanced service!

# Stop
quit both terminal with port-forwards
run the `delete.sh` to delete all the resources

