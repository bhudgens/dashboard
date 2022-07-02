#! /usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# We're mostly just confirming that the person's envs are loaded
# before we proceed
s3BucketName=${s3BucketName?"Must set s3BucketName"}

docker-compose -f "$SCRIPT_DIR/docker-compose.yml" down
docker-compose -f "$SCRIPT_DIR/docker-compose.yml" up -d

# Rely on docker aws since the person's local could be the wrong version
_aws="docker run --rm -it -v $HOME/.aws:/root/.aws -v $(pwd):/aws --env AWS_SESSION_TOKEN --env AWS_ACCESS_KEY_ID --env AWS_SECRET_ACCESS_KEY --env AWS_PAGER='' bhudgens/aws-cli"

# We try to set to the docker IP to work more universally but
# it is likely we would need to tickle this for MacOS
awsEndpointIp="$(docker network inspect $(docker network ls | grep bridge | head -n 1 | awk '{print $1}') | jq -r '.[].IPAM.Config[].Gateway')"

[ -z "$awsEndpointIp" ] && echo "Could not find your docker interface" && exit 1

# It takes several seconds for the localstack containers to come online
# so we wait an artificial few seconds before we try to create the
# S3 Bucket. We use the ENV config because effectively that will also
# get passed to the software and automatically be consumed
echo "Waiting for services to come online"
sleep 10
echo "Creating S3 Bucket Locally"

$_aws "--endpoint-url=http://${awsEndpointIp}:4566" s3 mb "s3://$s3BucketName"

# We set this for the application
# This will override the SDK configuration
# telling it to use our "local" environment
echo "
  You need to export this variable:

  export AWS_ENDPOINT='http://${awsEndpointIp}:4566'
"
