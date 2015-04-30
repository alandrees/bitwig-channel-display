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


/**\fn ChannelDisplay.ChannelDisplay.prototype.send_text
 *
 * Parses the text 4 lines, and sends it to display
 *
 * @param text (string) string to send to the display
 *
 * @returns None
 */

ChannelDisplay.ChannelDisplay.prototype.send_text = function(text)
{
    var lines = {1 : '',
		 2 : '',
		 3 : '',
		 4 : ''};

    if(typeof this.parse_func === 'function')
    {
	lines = this.parse_func(text);
    }
    else
    {
	lines[1] = text.substring(0, this.line_length);
    }

    for(var line in lines)
    {
	this._send_data(line, lines[line]);
    }
}


/**\fn ChannelDisplay.ChannelDisplay.prototype.set_parse_func
 *
 * Updates the text line parsing function.  I do no type checking in case you want to remove the parser.
 *
 * @param func (function) Function to set the line parser to
 *
 * @returns None
 */

ChannelDisplay.ChannelDisplay.prototype.set_parse_func = function(func)
{
    this.parse_func = func;
}
