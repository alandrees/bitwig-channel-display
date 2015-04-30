loadAPI(1);

/**
 * Copyright 2015 Alan Drees
 *
 * Purpose:
 *  Channel Display Controller script entry point
 *
 * Dependencies:
 *
 */

var console = {};

console.debug = false;

console.log = function(string)
{
    if(console.debug === true)
    {
	println(string);
    }
}


load('channel_display_options.js');
load('channel_display_object.js');
load('channel_display_group_object.js');

host.defineController("Stealthascope", "Channel Display Controler", "0.0", "7AECC690-751D-4324-9DBE-60F7B9839436", "Alan Drees");
host.defineMidiPorts(0,1);

//add some discovery stuff here later

var controllers = new Array();
var icc_network = new Array();

//icc_network.push(ICC.create_new_icc_network('channeldisplay8'));

controllers[0] = new ChannelDisplay.ChannelDisplayGroupController(ChannelDisplay.options, 0, 0);

/**\fn init
 *
 * init function entry point wrapping the controller components
 *
 * @param None
 *
 * @returns None
 */

function init()
{
    for(var controller in controllers)
    {
	controllers[controller].init();
    }
}

/**\fn exit
 *
 * exit function to wrap the controller components exit functions
 *
 * @param None
 *
 * @returns None
 */

function exit()
{
    for(var controller in controllers)
    {
	controllers[controller].exit();
    }
}


/**\fn flush
 *
 * flush function to wrap the controller components flush functions
 *
 * @param None
 *
 * @returns None
 */

function flush()
{
    for(var controller in controllers)
    {
	controllers[controller].flush();
    }
}
