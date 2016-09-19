from sense_hat import SenseHat
import json
import sys

sense = SenseHat()

sense.low_light = True
sense.show_message(sys.argv[1]);

print(json.dumps( { 'result': 'success' } ))