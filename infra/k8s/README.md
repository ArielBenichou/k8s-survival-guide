# K8s Files
Those are tested to work on MiniKube.

# Run
run the `init.sh` scirpt to bring up all the manifest in order

# Stop
run the `delete.sh` to delete all the resources

# Expose
You need to expose one backend pod to localhost:8080
and expose one frontend pod to another port (frontend talk to localhost:8080 for backend)
```sh
kubectl port-forward deployment/backend 8080:3000 -n=petworx
kubectl port-forward deployment/frontend 3000:3000 -n=petworx
```
