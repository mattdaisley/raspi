from sense_hat import SenseHat

sense = SenseHat()

temp = sense.get_temperature()
print "Temp: %s C" % temp

# humidity = sense.get_humidity()
# sense.show_message("Hum: %s %%rH" % humidity)

# temp = sense.get_temperature_from_humidity()
# sense.show_message("Temp from Hum: %s C" % temp)

# pressure = sense.get_pressure()
# sense.show_message("Pressure: %s Millibars" % pressure)

# temp = sense.get_temperature_from_pressure()
# sense.show_message("Temp from pressure: %s C" % temp)