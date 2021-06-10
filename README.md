# Multi-container K8s 


[![Build Status](https://travis-ci.com/deontaljaard/travisci-gcp-multi-k8s-workflowsvg?branch=main)](https://travis-ci.com/deontaljaard/travisci-gcp-multi-k8s-workflow)

The project houses an (over-engineered) Fibonacci calculator. Used it to learn more about a more complex CI flow.

```text
-> react app
-> server       -> redis       <- worker
                -> postgres
```

Create password for PG
```bash
kubectl create secret generic pgpassword --from-literal PG_PASSWORD=password
```

Create encrypted service-account.json
```bash
docker run -it -v $(pwd):/app ruby:2.4 sh
gem install travis
travis login --github-token $GH_TOKEN --pro
copy json into the 'volumed' dir
travis encrypt-file service-account.json -r $USERNAME/$REPO
```