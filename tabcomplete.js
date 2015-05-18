$.widget("cbenni.tabcomplete", {
	options: {
		collection: [],
	},
	_create: function() 
	{
		var textsplit = ["", "", ""];
		var tabtries = -1;
		var self = this;
		this.element.bind("click focus", function() {
			self.tabtries = -1;
		});
		var textfunction = null;
		this.element.keydown(function(e) {
			var code = e.keyCode || e.which;
			if (code == 9) { // tab pressed
				e.preventDefault();
				// if this is the first time tab is pressed here, we split the text before and after the word
				if (tabtries == -1) {
					$this = $(this);
					var caretpos = $this.caret();
					if($this.is("input, select, textarea"))
						textfunction = function(v){return (arguments.length?$this.val(v):$this.val());};
					else 
						textfunction = function(v){return (arguments.length?$this.text(v):$this.text());};
					var text = textfunction();
					var start = (/\w+$/.exec(text.substr(0, caretpos)) || {index: caretpos}).index;
					var end = caretpos + (/^\w+/.exec(text.substr(caretpos)) || [""])[0].length;
					textsplit = [text.substring(0, start), text.substring(start, end), text.substring(end + 1)];
				}
				// calculate the collection of strings actually eligible for suggestion, either by filtering or by executing the function specified
				var collection = self.options.collection || [];
				if(typeof collection === "object")
				{
					collection = collection.filter(function(v){
						return v.toLowerCase().indexOf(textsplit[1].toLowerCase())==0;
					});
				}
				else if (typeof collection == "function") 
					collection = collection(textsplit[1]);
				// collection now (hopefully) is a list of values
				if (collection.length > 0) {
					// shift key iterates backwards
					tabtries += e.shiftKey?-1:1;
					if(tabtries >= collection.length) tabtries = 0;
					if(tabtries < 0) tabtries = collection.length+tabtries;
					textfunction(textsplit[0] + collection[tabtries] + textsplit[2]);
					$(this).caret(textsplit[0].length + collection[tabtries].length);
				}
			}
			// escape
			else if(code == 27 && tabtries>=0)
			{
				textfunction(textsplit[0] + textsplit[1] + textsplit[2]);
			}
			// not shift
			else if(code != 16)
			{
				tabtries = -1;
			}
		});
	}
});
