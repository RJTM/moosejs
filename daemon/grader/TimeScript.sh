#!/bin/bash
set -e

timelimit=$1
shift

container=$(docker run -d "$@")
code=$(timeout "$timelimit" docker wait "$container" || true)
docker kill $container &> /dev/null
if [ -z "$code" ]; then
	>&2 echo "Timeout"
	docker rm $container &> /dev/null
	exit 2
else
	docker logs $container
	docker rm $container &> /dev/null
	exit $code
fi


