############################################################
# Dockerfile to build sandbox for executing user code
# Based on Ubuntu
############################################################

FROM ubuntu:14.04
MAINTAINER Emilio Tirado <emilio.tirado57@gmail.com>, Ricardo Tovar <rjtm1992@gmail.com>

# Update the repository sources list 
RUN apt-get update

#Install all the languages/compilers we are supporting.
RUN apt-get install -y g++
RUN apt-get install -y python
RUN apt-get install -y bc
RUN apt-get install -y gcc
RUN apt-get install -y php5-cli
RUN apt-get install -y ruby
RUN apt-get install -y mono-xsp2 mono-xsp2-base
RUN apt-get install -y golang-go	
RUN apt-get install -y nodejs
RUN apt-get install -y clojure1.4

#prepare for Java download
RUN apt-get install -y python-software-properties
RUN apt-get install -y software-properties-common

#grab oracle java (auto accept licence)
RUN add-apt-repository -y ppa:webupd8team/java
RUN apt-get update
RUN echo oracle-java7-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections
RUN apt-get install -y oracle-java7-installer

RUN apt-get install -y scala
RUN apt-get install -y perl
RUN apt-get install -y haskell-platform
RUN apt-get install -y fp-compiler
