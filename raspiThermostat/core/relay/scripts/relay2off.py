# p2off.py

import RPi.GPIO as GPIO
import time
import json

GPIO.setwarnings(False)

GPIO.setmode(GPIO.BCM)
GPIO.setup(3, GPIO.OUT) 

try:
  GPIO.output(3, GPIO.HIGH)


# End program cleanly with keyboard
except KeyboardInterrupt:

  # Reset GPIO settings
  GPIO.cleanup()

print(json.dumps( { 'result': 'off' } ));