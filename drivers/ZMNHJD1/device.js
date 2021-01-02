'use strict';

const Homey = require('homey');

const QubinoDevice = require('../../lib/QubinoDevice');
const { CAPABILITIES, COMMAND_CLASSES } = require('../../lib/constants');
const {MODES} = require('./constants');
/**
 * Flush Dimmer (ZMNHJD)
 * Manual: https://www.planete-domotique.com/notices/Q/QUBINO/Qubino_Flush%20Pilot%20Wire_PLUS_user%20manual_V1.1_fra.pdf
 */

  
class ZMNHJD extends QubinoDevice {

  /**
   * Method that will register capabilities of the device based on its configuration.
   * @private
   */
   async registerCapabilities() {
       
        this.registerCapability('modeFonctionnementZMNHJD', COMMAND_CLASSES.SWITCH_MULTILEVEL, {
            getOpts: {
                getOnStart: true, // dim value is retrieved manually in _getCapabilityValuesOnStart()
            },
        });
        
        this.registerReportListener(COMMAND_CLASSES.SWITCH_MULTILEVEL, 'SWITCH_MULTILEVEL_REPORT', (rawReport, parsedReport) => {
			 if( Buffer.isBuffer(rawReport['Value (Raw)']) ){
			     var buf = Buffer.from(rawReport['Value (Raw)']);
			     var readValue = buf.readInt8(0);
			     var keyModeSelectionne = this._getKeyModeFromValue(readValue);
			     this.setCapabilityValue('modeFonctionnementZMNHJD', keyModeSelectionne);
            }
		});
        
        this.registerCapabilityListener('modeFonctionnementZMNHJD', async (value) => {
            var old = this.getCapabilityValue('modeFonctionnementZMNHJD');
            if(  old != value ){
                this._writeValue(value );
            }
            return true;
        });
        
         await this.registerTemperatureSensor();
        
        await this._getCapabilityValuesOnStart();
    }
    
    async _writeValue(value){
        let valeur = MODES[value].MAX;
        try{
            const commandClass = this.getCommandClass('SWITCH_MULTILEVEL');
            const buff = Buffer.allocUnsafe(1);
            buff.writeInt8(valeur,0);
            const result = await commandClass.SWITCH_MULTILEVEL_SET({
                "Value": buff,
                "Dimming Duration": 0}
            );
            return true;
        }catch (err) {
            return console.error( err );
        }
    }
    
    _getKeyModeFromValue(value){
        for(let key of  Object.keys(MODES) ){
            if( value >= MODES[key].MIN && value <= MODES[key].MAX ) return key;
        }
        return 'ECO';
    }
    
    async _getCapabilityValuesOnStart() {
        try{
            //read zwave
            const commandClass = this.getCommandClass('SWITCH_MULTILEVEL');
            commandClass.SWITCH_MULTILEVEL_GET()
                .then( result => {
                    this.log("---R---"+result['Value']);
                    for(let key of  Object.keys(result['Value']) ){
                        this.log("--------KEY--------"+key);
                        this.log("--------value--------"+result[key]);
                    }
            });
            return true;
        }catch (err) {
            return this.error('failed to getCapability', err);
        }
    }
}



module.exports = ZMNHJD;
