#!/bin/bash
set -e

timelimit=$1
shift

container=$(docker run -d "$@")
code=$(timeout "$timelimit" docker wait "$container" || true)
if [ -z "$code" ]; then
	docker kill $container &> /dev/null
	>&2 echo "Timeout"
	docker rm $container &> /dev/null
	exit 137
else
	docker logs $container
	docker rm $container &> /dev/null
	exit $code
fi


