	const marbles = ['blue', 'green', 'red', 'yellow', 'purple'];
	const colorvalue = {
		"a": "blue",
		"b": "green",
		"c": "red",
		"d": "yellow",
		"e": "purple"
	};
	const itemmap = {
		"1": ["a"],
		"2": ["a", "b"],
		"3": ["a", "b", "c"],
		"4": ["a", "b", "c", "d"],
		"5": ["a", "b", "c", "d", "e"]
	}
	const range = ['small', 'medium', 'large'];

	/*Combination of Array*/
	function getCombinations(chars) {
		var result = [];
		var f = function (prefix, chars) {
			for (var i = 0; i < chars.length; i++) {
				result.push(prefix + chars[i]);
				f(prefix + chars[i], chars.slice(i + 1));
			}
		}
		f('', chars);
		return result;
	}
	/*Permutation of Array*/
	var permArr = [],
		usedChars = [];

	function permute(input) {
		var i, ch;
		for (i = 0; i < input.length; i++) {
			ch = input.splice(i, 1)[0];
			usedChars.push(ch);
			if (input.length == 0) {
				permArr.push(usedChars.slice());
			}
			permute(input);
			input.splice(i, 0, ch);
			usedChars.pop();
		}
		return permArr;
	}
	/*Sort Array*/
	function sortCollection(collection) {
		var sortedCollection = collection.sort(function (a, b) {
			return a.length - b.length;
		});
		return sortedCollection;
	}

	function removeDuplicate(collection) {
		var hashMap = {}
		collection.forEach(function (arr) {
			hashMap[arr.join("|")] = arr;
		});
		var result = Object.keys(hashMap).map(function (k) {
			return hashMap[k]
		});
		return result
	}

	function generateMarble(marble) {
		let combination = sortCollection(getCombinations(marble));
		let permutedcollection = combination.map(item => {
			return permute(item.split(""));
		});
		return removeDuplicate(permutedcollection[0]);
	}
	/*Generate button click*/
	function onGenerateClick() {
		let count = document.getElementById('marbleCount').value;
		let selectboundry = document.getElementById('selectboundry').value;
		let selectorientation = document.getElementById('selectorientation').value;
		let customRange = document.getElementById('customRange').value;
		permArr = [];
		usedChars = [];
		$("#result").empty();
		let marbleCollection = generateMarble(itemmap[count]);
		let loop = sortCollection(marbleCollection);
		console.log(loop);
		$("#resultspan").text(loop.length);
		loop.forEach(drawFunction);

		function drawFunction(item, index) {
			item.forEach(draw);
			if (selectorientation == "column") {
				$("#result").append("<br>");
			}
		}

		function draw(item, index) {
			let colr = colorvalue[item];
			let combine = (selectboundry) + '-' + colr;
			$("#result").append("<div class='circle " + combine + " " + range[customRange] + " '></div>");
		}
	}