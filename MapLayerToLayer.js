//from
//to

///////////CODE/////////////

print('Script by ctRy');

if (arguments[0] == "" || arguments.length < 2 || arguments[1] == "")
    throw "Argument 0 = layer name of from, Argument 1 = layer name of to\n";

var fromLayer;
var toLayer;

try
{
	fromLayer = wp.getLayer().withName(arguments[0]).go();
}
catch(err)
{
	fromLayer = wp.getLayer().fromWorld(world).withName(arguments[0]).go();
}

try
{
	toLayer = wp.getLayer().withName(arguments[1]).go();
}
catch(err)
{
	try
	{
		toLayer = wp.getLayer().fromWorld(world).withName(arguments[1]).go();
	}
	catch(err)
	{
		throw "Worldpainter only recognizes layers that are painted in the world somewhere. Therefore, draw a random dot with " + arguments[1] + ".\n";
	}
	
}

print("Mapping " + arguments[1] + " to match values of " + arguments[0]);
print(arguments[1] + " will be overwritten (you can undo after running the script).");

var rect = dimension.getExtent();

for (var x = rect.getX() * 128; x < rect.getWidth() * 128; x++)
{
    for (var y = rect.getY() * 128; y < rect.getHeight() * 128; y++)
    {
		dimension.setLayerValueAt(toLayer, x, y, dimension.getLayerValueAt(fromLayer, x, y));
    }
}

print('Done! :D');