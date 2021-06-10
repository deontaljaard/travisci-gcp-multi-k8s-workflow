docker build -t deontaljaard/multi-client:latest -t deontaljaard/multi-client:$GIT_SHA -f ./client/Dockerfile ./client
docker build -t deontaljaard/multi-server:latest -t deontaljaard/multi-server:$GIT_SHA -f ./server/Dockerfile ./server
docker build -t deontaljaard/multi-worker:latest -t deontaljaard/multi-worker:$GIT_SHA -f ./worker/Dockerfile ./worker

docker push deontaljaard/multi-client:latest 
docker push deontaljaard/multi-server:latest
docker push deontaljaard/multi-worker:latest

docker push deontaljaard/multi-client:$GIT_SHA
docker push deontaljaard/multi-server:$GIT_SHA
docker push deontaljaard/multi-worker:$GIT_SHA

kubectl apply -f k8s
kubectl set image deployments/client-deployment server=deontaljaard/multi-client:$GIT_SHA
kubectl set image deployments/server-deployment server=deontaljaard/multi-server:$GIT_SHA
kubectl set image deployments/worker-deployment server=deontaljaard/multi-worker:$GIT_SHA
