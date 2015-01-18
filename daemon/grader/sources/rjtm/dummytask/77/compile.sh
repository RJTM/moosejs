#!/bin/bash

########################################
#			This is the script file responsible for compiling the source code
#			- It takes 3 arguments
#					1. The compiler to be used in the compilation
#					2. The source file to be compiled
#					3. Additionals arguments for the compiler
#
#			Sample execution: 			$: ./compile.sh g++ file.cpp -O2
#
########################################

compiler=$1
file=$2
addArg=$3

#exec 1>$"compilation.log"
exec 2>$"compilation.error"

START=$(date +%s.%2N)

result=$($compiler $file $addArg)

END=$(date +%s.%2N)

runtime=$(echo "$END - $START" | bc)

if [ $result -eq 0 ];	then
	echo "Compilation succeeded"
else
	echo "Compilation failed"
fi

echo $runtime