#!/bin/bash

set -e

rm -rf ./bin
mkdir bin
touch ./bin/index.js
chmod 755 ./bin/index.js

echo "#!/usr/bin/env node
require('../lib').makeTypes();" > ./bin/index.js
