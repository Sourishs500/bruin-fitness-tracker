#!/bin/bash

ls ../components | sed -r "s/.*js//" | sed -r "s/(.+)/\t\t\t<div><Full\u\1\/><\/div>/"
