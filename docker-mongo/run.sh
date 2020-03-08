#!/bin/bash
set -m

mongod --config /etc/mongod.conf --bind_ip_all &

fg
