'use strict';

const QubinoDriver = require('./../../lib/QubinoDriver');
const {MODES} = require('./constants');

class ZMNHJD extends QubinoDriver {
	onInit(){
		this._registerFlowCardAction("setModeChauffage", this._changeMode );
	}
	
	async _changeMode(args){
		return args.device._writeValue(args.mode);
	}
}

module.exports = ZMNHJD;
