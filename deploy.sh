name=`pwd | sed -r 's/^.+\///' | awk -F'-' '{print $NF}'`
namespace=`cat deployments/k8s/kustomization.yaml| grep ^namespace | awk -F':' '{print $2}' | sed -r -e 's/^ +//' -e 's/ +$//'`

kubectl --kubeconfig /kubeconfig.yaml -n ${namespace} delete deployment ${name}-prod
kubectl --kubeconfig /kubeconfig.yaml apply -k ./deployments/k8s/
