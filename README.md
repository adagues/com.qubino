# Qubino

This app adds support for Qubino Z-Wave modules in Homey.

### Changelog
Version 2.0.4
* Added support for ZMNHYD (Smart Plug)
* Added support for ZMNHKD (Flush PWM Thermostat)

Version 2.0.3
* Added support for ZMNHID (Flush On/Off Thermostat)

Version 2.0.1
* Updated dependencies
* Updated power meter report parsers to accommodate for incomplete reports

Version 2.0.0
* Major update to SDKv2 (please note, it is advised to re-pair your devices, otherwise some functionality might break)
* Added support for roller shutters (ZMNHCD and ZMNHOD)
* Added missing configuration parameters
* Added input functionality (please note, this might require some configuration of the device, refer to the device manual, the device settings and the Flow Card hints for more information)
* Added dim duration ability on Flow Cards of devices supporting 'dimming over time'
* Added 'reset power meter' Flow Cards and button capabilities to devices that support this functionality
* Added 'calibration' button capabilities to devices that support this functionality

Version 1.1.6
* Minor bug fixes for dimming duration setting (parameter 66) for ZMNHVD1, ZMNHSD1 and ZMNHDA2

Version 1.1.0
* Add support for ZMNHDD1 (Flush Dimmer)
* Add support for ZMNHBD1 (Flush 2 Relays)
* Add support for ZMNHAD1 (Flush 1 Relay)
* Add support for ZMNHDA2 (Flush Dimmer)
* Add support for ZMNHND1 (Flush 1D Relay)
* Add support for ZMNHVD1 (Flush Dimmer 0 - 10V)
* Add support for ZMNHKD1 (Flush Heat & Cool Thermostat)
* Add support for ZMNHIA2 (Flush On/Off Thermostat)
* Add support for ZMNHTD1 (Smart Meter)
* Add support for ZMNHSD1 (DIN Dimmer)
* Known limitations:
    * ZMNHDD1 (Flush Dimmer): input 2 and 3 can not be used in Flows
    * ZMNHBD1 (Flush 2 Relays): 
        * input 1 and 2 can not be used in Flows
        * power consumption for multichannel nodes not reporting
        * on/off state for multichannel nodes not reporting
    * ZMNHAD1 (Flush 1 Relay): input 2 and 3 can not be used in Flows
    * ZMNHKD1 (Flush Heat & Cool Thermostat): input 2 and 3 can not be used in Flows
    * ZMNHIA2 (Flush On/Off Thermostat): input 2 and 3 can not be used in Flows
    * ZMNHSD1 (DIN Dimmer): input 1 can not be used in Flows
