# tabcomplete #
JQuery plugin for tab-completing text, for example for usernames in a chat window.

## Usage ##

    $(selector).tabcomplete(options);
	
where `options` contains only one element, `collection`, which can either be an array of strings or a `function(word)` returning an array based on a word (the word the cursor was located at when the user pressed tab). Supports all input types supported by caret.js

Note: the values are not cached by tabcomplete.js - if you load values via ajax or similar, caching will be left to you.

## Examples ##

	$("textarea").tabcomplete({collection: ["some user",
											"some user1",
											"someuser2",
											"someuser3",
											"some user4",
											"some user5",
											"another user",
											"another user24"]});

If the `collection` is an array, as seen above, it will suggest only entries that start with the word the caret is at. This filtering is not applied to  `collection: function(word)`, as seen below. Suggestions are cycled respecting the order in which the items appear in the collection, therefore a deterministic order is suggested.

	allusers = ["some user",
				"some user1",
				"someuser2",
				"someuser3",
				"some user4",
				"some user5",
				"another user",
				"another user24"];
	$("textarea").tabcomplete({collection: function(word)
		{
			// return the array items that start with the word
			return allusers.filter(function(v){return v.indexOf(word)==0;});
		}
	});
	

Live demo: http://codepen.io/anon/pen/KpVZmz