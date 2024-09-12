#!/bin/zsh
kubectl apply -f petworx.namespace.yaml
kubectl apply -f db -R
kubectl apply -f backend -R
