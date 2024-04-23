#!/usr/bin/env bash

composer install -n --optimize-autoloader

exec "$@"