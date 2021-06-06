# Multi-container K8s 

The project houses an (over engineerd) Fibonacci calculator. Used it to learn more about a more complex CI flow.

```text
-> react app
-> server    -> redis <- worker
             -> postgres
```

Create password for PG
```bash
kubectl create secret generic pgpassword --from-literal PG_PASSWORD=password
```