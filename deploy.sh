#!/bin/bash -e

echo 'Deploying node app'
scp *.js root@mylinkit.local:src/
scp -r assets/* root@mylinkit.local:src/assets
scp -r public/* root@mylinkit.local:src/public
ssh root@mylinkit.local <<EOF
  cd src/
  killall node || true
  nohup node index.js &
EOF

# echo 'Deploying arduino app'
# scp arduino/arduino.ino.smart7688.hex root@mylinkit.local:src/
# ssh root@mylinkit.local <<EOF
#   cd src/
#   avrdude -p m32u4 -c linuxgpio -v -e -U flash:w:arduino.ino.smart7688.hex
# EOF
