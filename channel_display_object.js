/**
 * Copyright 2015 Alan Drees
 *
 * Purpose:
 *  Implements an object representing a display output
 *
 * Dependencies:
 */

var ChannelDisplay = ChannelDisplay || {};


/**\fn ChannelDisplay.ChannelDisplay
 *
 * Channel Display object constructor
 *
 * @param options (object) options object
 * @param parse_func (function) function which determines how to parse the string
 * @param instance (integer) represents the control to send data for
 * @param midi_instance (integer) midi instance to send data for
 *
 * @returns None
 */

ChannelDisplay.ChannelDisplay = function(options, parse_func, instance, midi_instance)
{
    this.midi_instance = midi_instance;
    this.parse_func = parse_func;
    this.instance = instance;
    this.line_length = options.line_length;

    if(options.osc === true)
    {
	this._init_osc();
	this._send_data = ChannelDisplay.ChannelDisplay.prototype._send_osc;
    }
    else
    {
	this._send_data = ChannelDisplay.ChannelDisplay.prototype._send_midi;
    }
}
