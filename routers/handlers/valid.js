module.exports.valid = function(req) {
	let res = false;
	req.url = req.originalUrl;
	let errorMsg = "";
	console.log(req.method);
	console.log(req.url);
	switch(req.method) {
		case 'GET':
		{
			console.log(req.params);
			console.log(req.url.split("/")[3]);
			switch (req.url.split("/")[3])
			{
				case 'read':
				{
					console.log((req.params.id));
					if (!(parseInt(req.params.id, 10) > 0))
					{
						errorMsg += "error: id argument is not valid\n";
					}
					break;
				}
				case 'readall':
				{
					switch (req.url.split("/")[2]) {
						case "vehicles":
						{
							if (!(parseInt(req.params.fleetId, 10) > 0))
							{
								errorMsg += "error: fleetId argument is not valid\n";
							}
							break;
						}
					}
					break;
				}
			}
			break;
		}
		case 'POST':
		{
			console.log(req.body);
			switch (req.url.split("/")[3]) {
				case 'create':
				{
					switch(req.url.split("/")[2])
					{
						case "fleets":
						{
							if (req.body.name === undefined)
							{
								errorMsg += "error: name is not found\n";
							}
							break;
						}
						case "motions":
						{
							if (!req.body.latitude)
							{
								errorMsg += 'error: latitude is not found\n';
							}
							if (!req.body.longitude)
							{
								errorMsg += "error: longitude is not found";
							}
							if (!req.body.time)
							{
								errorMsg += "error: time is not found";
							}
							if (!req.body.vehicleId)
							{
								errorMsg += "error: vehicleId is not found";
							}
							break;
						}
						case "vehicles":
						{

							break;
						}
					}
					break;
				}
				case 'delete':
					if (payload.id !== undefined)
						res = true;
					break;
				case 'update':
					if (payload.name !== undefined && payload.birth !== undefined
						&& payload.films !== undefined && payload.liked !== undefined
						&& payload.photo !== undefined)
					{
						if ((payload.liked > 0 || payload.liked === null)
							&& (payload.films > 0 || payload.films === null))
						{
							res = true;
						}
					}
					break;
				case '/api/actors/update':
					if (payload.id !== undefined
						&& (payload.liked > 0 || payload.liked === null || payload.liked === undefined)
						&& (payload.films > 0 || payload.films === null || payload.films === undefined))
					{
						res = true;
					}
					break;
			}
			break;
		}
	}
	if (errorMsg === "")
	{
		console.log("all is good");
		res = true;
	}
	return { res, errorMsg };
};