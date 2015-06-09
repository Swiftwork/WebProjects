function MultiMap () {
	this.names = [];
	this.groups = {};
}

//------------------------------------------------------------------------------------
// PUBLIC API
//------------------------------------------------------------------------------------

/* GROUPS */

MultiMap.prototype.addGroup = function(name, index) {
	if (name === undefined)
		throw "Name cannot be undefined and must be unique";

	if (index === undefined) index = this.names.length;
	if (index > this.names.length)
		throw index + " is larger than data size";

	if (this.names.indexOf(name) === -1) {
		this.names.splice(index, 0, name);
		this.groups[name] = [];
	} else {
		throw "Group " + name + " already exists";
	}
	return this.groups[name];
};

MultiMap.prototype.getGroup = function(name) {
	return this.groups[name];
};

MultiMap.prototype.moveGroup = function(name, index) {
	if (index > this.names.length) throw index + " is larger than data size";

	this.names.splice(index, 0, this.names.splice(this.groupPosition(name), 1)[0]);
};

MultiMap.prototype.groupSize = function(name) {
	return this.groups[name].length;
};

MultiMap.prototype.groupPosition = function(name) {
	var position = this.names.indexOf(name);
	if (position !== -1)
		return position;
	else
		throw "Group " + name + " does not exist";
};

MultiMap.prototype.removeGroup = function(name) {
	this.names.splice(this.groupPosition(name), 1);
	delete this.groups[name];
};

/* ITEMS */

MultiMap.prototype.addItem = function(item, group, index) {
	if (this.groups[group] === undefined)
		throw "Group " + group + " does not exist";

	if (index === undefined) index = this.groups[group].length;
	if (index > this.groups[group].length)
		throw index + " is larger than group size";

	this.groups[group].splice(index, 0, item);
};

MultiMap.prototype.getItem = function(index, group) {
	if (index > this.groups[group].length)
		throw index + " is larger than group size";

	return this.groups[name][index];
};

MultiMap.prototype.getItemGroup = function(item) {
	for (var name in this.names) {
		if (this.groups[name].indexOf(item) !== -1)
			return name;
	}
};

MultiMap.prototype.moveItem = function(item, index, group) {
	if (group === undefined) group = this.getItemGroup(item);

	this.groups[group].splice(index, 0, this.groups[group].splice(this.itemPosition(item, group), 1)[0]);
};

MultiMap.prototype.itemPosition = function(item, group) {
	if (this.groups[group] !== undefined) {
		var position = this.groups[name].indexOf(item);
		if (position !== -1)
			return position;
	} else {
		for (var name in this.names) {
			var position = this.groups[name].indexOf(item);
			if (position !== -1)
				return position;
		}
	}
};

MultiMap.prototype.removeItem = function(item, group) {
	if (group === undefined) group = this.getItemGroup(item);

	this.groups[group].splice(this.itemPosition(item, group), 1);
};

/* GENERAL */

MultiMap.prototype.getGroups = function() {
	return this.groups;
};

MultiMap.prototype.getGroupNames = function() {
	return this.names;
};

MultiMap.prototype.getGroupCount = function() {
	return this.names.size;
};
