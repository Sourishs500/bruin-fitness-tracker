#!/bin/bash

ls ../components | sed -r "s/.*js//" | sed -r "s/(.+)/import Full\u\1 from '.\/components\/\1\/full\1.js'; /" | sed -r 's/full(.)/full\u\1/g'
