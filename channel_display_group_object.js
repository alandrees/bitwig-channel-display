/**
 * Copyright 2015 Alan Drees
 *
 * Purpose:
 *   Implements an object representing and managing a group of channel display objects
 *
 * Dependencies:
 *
 */

var ChannelDisplay = ChannelDisplay || {};


/**\fn ChannelDisplay.ChannelDisplayGroupController
 *
 * Constructor for the ChannelDisplayGroup controller object
 *
 * @param options options to be set internally for the controller
 * @param instance instance of the controller
 * @param midi_instance midi io instance this controller exists on
 *
 * @returns None
 */

ChannelDisplay.ChannelDisplayGroupController = function(options, instance, midi_instance)
{
    this.instance = instance;
    this.midi_instance = midi_instance;
    this.set_options(options);
}


/**\fn ChannelDisplay.ChannelDisplayGroupController.prototype.init
 *
 * Init function to be called to initialize the controller
 *
 * @param banks banks passed from the encapsulating object
 *
 * @returns None
 */

ChannelDisplay.ChannelDisplayGroupController.prototype.init = function(banks)
{
    var self = this;

    this.channels = new Array();

    this.banks = {};

    if(typeof banks === 'undefined')
    {
	this.banks.transport = host.createTransport();
	this.banks.application = host.createApplication();
	this.banks.trackbank = host.createMainTrackBank(this.options.channels,
							0,
							0);
    }
    else
    {
	this.banks = banks;
    }

    var cd = {};

    for(var x = 0; x < this.options.channels; x++)
    {
	cd = new ChannelDisplay.ChannelDisplay(this.options, {}, x, this.midi_instance);

	var track = this.banks.trackbank.getTrack(x);

	track.addNameObserver(80, "", function(string){cd.send_text(string);});

	this.channels.push(cd);
    }
}


/**\fn Launchpad.LaunchpadController.prototype.set_options
 *
 * Sets controller options
 *
 * @param options options with which to set (use defaults if not set)
 *
 * @returns None
 */

ChannelDisplay.ChannelDisplayGroupController.prototype.set_options = function(options)
{
    this.options = { 'channels' : 1,
		     'osc'      : false}

    if(typeof options === 'object')
    {
	for(var option in options)
	{
	    this.options[option] = options[option];
	}
    }
}
