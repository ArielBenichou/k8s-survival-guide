---
# You can also start simply with 'default'
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://images.unsplash.com/photo-1484589065579-248aad0d8b13?q=80&w=2859&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
# some information about your slides (markdown enabled)
title: Kubernetes Survival Guide
info: |
  Kubernetes Initialization for developers.
# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
addons:
    - slidev-addon-excalidraw
hideInToc: true
---

# Kubernetes Survival Guide

One small pod for a dev, <br/>
one giant cluster for Networx

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Start Here <carbon:arrow-right class="inline"/>
  </span>
</div>

---
hideInToc: true
---

# Table of Content

<Toc minDepth="1" maxDepth="1"></Toc>

---
src: ./pages/cloud-overview.md
---

---
src: ./pages/docker-refresher.md
---

---
src: ./pages/k8s-basic.md
---

