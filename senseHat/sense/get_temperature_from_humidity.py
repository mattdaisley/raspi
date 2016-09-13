from sense_hat import SenseHat
import json

sense = SenseHat()

print(json.dumps( { 'temperature': sense.get_temperature_from_humidity() } ))