############################################################
# Dockerfile to build sandbox for executing user code
# Based on Ubuntu
############################################################

FROM ubuntu:14.04
MAINTAINER Emilio Tirado <emilio.tirado57@gmail.com>, Ricardo Tovar <rjtm1992@gmail.com>

RUN useradd -ms /bin/bash moosejs

# Update the repository sources list 
RUN apt-get update

#Install all the languages/compilers we are supporting.
RUN apt-get install -y g++
RUN apt-get install -y python
RUN apt-get install bc
