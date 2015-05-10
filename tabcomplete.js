$.widget("cbenni.tabcomplete", {
	options: {
		collection: [],
	},
	_create: function() 
	{
		this.ltbt = ["", "", ""];
		this.tabtries = -1;
		var self = this;
		this.element.bind("click focus", function() {
			self.tabtries = -1;
		});
		
		this.element.keydown(function(plugin){return function(e) {
			var code = e.keyCode || e.which;
			if (code == 9) {
				e.preventDefault();
				if (plugin.tabtries == -1) {
					var c = $(this).caret();
					var t = $(this).val()||$(this).text();
					var start = (/\w+$/.exec(t.substr(0, c)) || {index: c}).index;
					var end = c + (/^\w+/.exec(t.substr(c)) || [""])[0].length;
					var w = t.substring(start, end);
					plugin.ltbt = [t.substring(0, start), w, t.substring(end + 1)];
				}
				var a = plugin.options.collection || [];
				var b = [];
				if(typeof a === "object")
				{
					for (i in a)if(a[i].toLowerCase().indexOf(plugin.ltbt[1].toLowerCase())==0) b.push(a[i]);
				}
				if (typeof a == "function") b = a(plugin.ltbt[1]);
				if (b.length > 0) {
					plugin.tabtries += e.shiftKey?-1:1;
					if(plugin.tabtries >= b.length) plugin.tabtries = 0;
					if(plugin.tabtries < 0) plugin.tabtries = b.length+plugin.tabtries;
					$(this).val(plugin.ltbt[0] + b[plugin.tabtries] + plugin.ltbt[2]);
					$(this).text(plugin.ltbt[0] + b[plugin.tabtries] + plugin.ltbt[2]);
					$(this).caret(plugin.ltbt[0].length + b[plugin.tabtries].length);
				}
			}
			else if(code == 27 && plugin.tabtries>=0)
			{
				$(this).val(plugin.ltbt[0] + plugin.ltbt[1] + plugin.ltbt[2]);
				$(this).text(plugin.ltbt[0] + plugin.ltbt[1] + plugin.ltbt[2]);
			}
			else if(code != 16)
			{
				plugin.tabtries = -1;
			}
		}}(this));
	}
});
