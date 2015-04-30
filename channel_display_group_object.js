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
