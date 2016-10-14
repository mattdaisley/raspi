# p2on.py

import RPi.GPIO as GPIO
import time
import json

GPIO.setmode(GPIO.BCM)
GPIO.setup(4, GPIO.OUT)

try:
  GPIO.output(4, GPIO.LOW)
  print "ON"


# End program cleanly with keyboard
except KeyboardInterrupt:
  print "  Quit"

  # Reset GPIO settings
  GPIO.cleanup()
  
print(json.dumps( { 'result': 'on' } ));