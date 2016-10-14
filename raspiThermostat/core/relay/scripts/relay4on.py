# p2on.py

import RPi.GPIO as GPIO
import time
import json

GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.OUT)

try:
  GPIO.output(17, GPIO.LOW)


# End program cleanly with keyboard
except KeyboardInterrupt:

  # Reset GPIO settings
  GPIO.cleanup()
  
print(json.dumps( { 'result': 'on' } ));