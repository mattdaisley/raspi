# p2off.py

import RPi.GPIO as GPIO
import time
import json

GPIO.setwarnings(False)

GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.OUT) 

try:
  GPIO.output(17, GPIO.HIGH)


# End program cleanly with keyboard
except KeyboardInterrupt:

  # Reset GPIO settings
  GPIO.cleanup()
  
print(json.dumps( { 'result': 'off' } ));