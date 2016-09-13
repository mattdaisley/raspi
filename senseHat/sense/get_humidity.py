from sense_hat import SenseHat
import json

sense = SenseHat()

print(json.dumps( { 'humidity': sense.get_humidity() } ))