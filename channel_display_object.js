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
    var lines = {0 : '',
		 1 : '',
		 2 : '',
		 3 : ''};

    if(typeof this.parse_func === 'function')
    {
	lines = this.parse_func(text);
    }
    else
    {
	lines[1] = text.substring(0, this.line_length);
    }

    if(text !== '')
    {
	var midi_out = host.getMidiOutPort(0);

	midi_out.sendMidi(0xA0 + this.instance,
			  0,
			  0);

	for(var line in lines)
	{
	    this._send_data(this.instance, parseInt(line), lines[line]);
	}

	midi_out.sendMidi(0xC0 + this.instance,
			  0,
			  0);
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


/**\fn ChannelDisplay.ChannelDisplay.prototype._send_midi
 *
 * Sends the data to the controller via MIDI
 *
 * @param instance (integer) display object instance
 * @param line (integer) line number to output for
 * @param text (string) string text to output
 *
 * @returns None
 */

ChannelDisplay.ChannelDisplay.prototype._send_midi = function(instance, line, text)
{
    if(text.length > 20){ text = text.substring(0, 20); }


    //send the control initialization

    var midi_out = host.getMidiOutPort(0);

    var i = 0;

    var line_output = line << 5;

    for(i = 0; i < text.length; i++)
    {
	midi_out.sendMidi(0xB0 + instance,
			  line_output + i,
			  text.substring(i, i + 1).charCodeAt());
    }

}


/**\fn ChannelDisplay.ChannelDisplay.prototype._send_osc
 *
 * Sends the data to the controller via OSC
 *
 * @param line (integer) line number to output for
 * @param text (string) string text to output
 *
 * @returns None
 */

ChannelDisplay.ChannelDisplay.prototype._send_osc = function(line, text){ }


/**\fn ChannelDisplay.ChannelDisplay.prototype._init_osc
 *
 * Initialize the OSC subsystem
 *
 * @param None
 *
 * @returns None
 */

ChannelDisplay.ChannelDisplay.prototype._init_osc = function(){ }
