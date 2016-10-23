// script.name=MapLayerToLayer - ctRy
// script.description=Places the given layer on the same positions as another layer (with the same intensity).
// script.param.from.type=string
// script.param.from.description=Layer name of from
// script.param.to.type=string
// script.param.to.description=Layer name of to
// script.hideCmdLineParams=true

///////////CODE/////////////

if (parseInt(org.pepsoft.worldpainter.Version.BUILD) <= 20160820173357)
	throw "Update WorldPainter!";

print('Script by ctRy');

var fromLayer;
var toLayer;

try
{
	fromLayer = wp.getLayer().withName(params['from']).go();
}
catch(err)
{
	fromLayer = wp.getLayer().fromWorld(world).withName(params['from']).go();
}

try
{
	toLayer = wp.getLayer().withName(params['to']).go();
}
catch(err)
{
	try
	{
		toLayer = wp.getLayer().fromWorld(world).withName(params['to']).go();
	}
	catch(err)
	{
		throw "Worldpainter only recognizes layers that are painted in the world somewhere. Therefore, draw a random dot with " + params['to'] + ".\n";
	}
	
}

print("Mapping " + params['to'] + " to match intensity of " + params['from']);
print(params['to'] + " will be overwritten (you can undo after running the script).");

var rect = dimension.getExtent();

for (var x = rect.getX() * 128; x < rect.getWidth() * 128; x++)
{
    for (var y = rect.getY() * 128; y < rect.getHeight() * 128; y++)
    {
		dimension.setLayerValueAt(toLayer, x, y, dimension.getLayerValueAt(fromLayer, x, y));
    }
}

print('Done! :D');