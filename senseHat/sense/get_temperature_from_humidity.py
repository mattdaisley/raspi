from sense_hat import SenseHat
import json

sense = SenseHat()

print(json.dumps( { 'result': (sense.get_temperature_from_humidity() * 1.8 + 15) } ))