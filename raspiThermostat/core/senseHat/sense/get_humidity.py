from sense_hat import SenseHat
import json

sense = SenseHat()

print(json.dumps( { 'result': sense.get_humidity() } ))