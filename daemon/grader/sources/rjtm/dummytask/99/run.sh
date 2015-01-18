#!/bin/bash

########################################
#			This is the script file responsible for running the solution exec
#			- It takes 3 arguments
#					1. Command to run the solution
#					2. Input file for the testcase
#					3. Output file for the testcase
#					4. Output file for stderr
#
#			Sample execution: 			$: ./run.sh ./a.out input.in output.out error.txt
#
########################################

cmd=$1
input=$2
output=$3
error=$4

exec 2>$error

START=$(date +%s.%2N)

$cmd < $input > $output

END=$(date +%s.%2N)

runtime=$(echo "$END - $START" | bc)

echo $runtime 
