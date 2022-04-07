var isGuitar = true;
var isRadio = false;
var isDef = false;

const notes_1 = ['до','','ре','','ми','фа','','соль','','ля','','си']
const notes_2 = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
const strings_1 = {'1':['e_4','e_16'],'2':['b_11','b_23'],'3':['g_7','g_19'],'4':['d_2','d_14'],'5':['a_9','a_21'],'6':['E_4','E_16']}
const strings_2 = ['e','b','g','d','a','E']

var input = $("#search_note");

var guitar = function(){
	if (!isGuitar){
		isGuitar = true;
		$("#div_guitar").css({"visibility": "visible"})
	} else {
		$("#div_guitar").css({"visibility": "hidden"})
		isGuitar = false;
	}
};
var intervals = function(){
	var text = $("#search_note").val()
	text = text.toLowerCase().trim()
	var interval = document.getElementById('interval').selectedIndex;
	if (text.length > 0 && interval > 0) {
		var spaceInd = text.indexOf(" ");
		var dashInd = text.indexOf("-");
		var i = -1;
		if (spaceInd != -1 && dashInd === -1) {
			var i = spaceInd;
		} else if (spaceInd === -1 && dashInd != -1){
			var i = dashInd;
		};
		if (i != -1) {
			var note = notes_1.indexOf(text.slice(0,i));
			if (note != -1){
			if (text.slice(i+1,text.length) === "диез") {
				++note;
			} else if (text.slice(i+1,text.length) === "бемоль"){
				--note;
			}} else return;
		} else {
			var note = notes_1.indexOf(text);
			if (note === -1) {
				if (text.slice(-1) === 'b' && text.length > 1){
					note = notes_2.indexOf(text.toUpperCase().slice(0,-1))
					--note;
				} else {
				note = notes_2.indexOf(text.toUpperCase())
				if (note === -1) {
					document.getElementById('alert_text').innerHTML = 'Неподдерживаемый формат ноты';
					return
				} else {
					document.getElementById('alert_text').innerHTML = ''
				}}
			} else {
				document.getElementById('alert_text').innerHTML = ''
			}
		}
		note = (note+12+interval)%12
		isRadio = false;

		if (notes_1[note] === "") {
			var note_text = notes_2[note] + ' (' + notes_1[note-1] + "-" + "диез" + ')';
		} else {
			var note_text = notes_2[note] + ' (' + notes_1[note] + ')'
		}
		document.getElementById('text').innerHTML = note_text;

		for (let i = 0; i<strings_2.length; i++) {
			let note_i = strings_2[i]+'_'+note;
			document.getElementById(note_i).checked = "checked";
			if (note_i.toLowerCase() == strings_1[i+1][0].toLowerCase() || note_i.toLowerCase() == strings_1[i+1][1].toLowerCase()) {
				document.getElementById(strings_1[i+1][1]).checked = "checked"
			} else if (note_i.toLowerCase()!=strings_1[i+1][0]){
				$("#"+strings_1[i+1][0]).prop('checked', false);
			}
		}
	} else if (interval === 0 && text.length > 0) {
		document.getElementById('alert_text').innerHTML = 'Выберите музыкальный интервал'
	} else if (interval != 0 && text.length === 0) {
		document.getElementById('alert_text').innerHTML = 'Введите ноту'
	};
};

function guitar_input(e) {
	document.getElementById('search_note').value = ''
	if (notes_1[e.id.slice(2)%12] === "") {
		var note_text = e.value + ' (' + notes_1[e.id.slice(2)%12-1] + "-" + "диез" + ')';
	} else {
		var note_text = e.value + ' (' + notes_1[e.id.slice(2)%12] + ')'
	}
	document.getElementById('text').innerHTML = note_text
	document.getElementById('interval').selectedIndex = 0
	string = strings_1[e.name.slice(7,8)]
	isRadio = true;
	if (e.id === string[0]) {
		document.getElementById(string[1]).checked = "checked"
	} else if (e.id === string[1]) {
		document.getElementById(string[0]).checked = "checked"
	}
	for (let i = 0; i<strings_2.length; i++) {
		let note_i = strings_2[i]+'_'+e.id.slice(2)%12;
		document.getElementById(note_i).checked = "checked";
		if (note_i.toLowerCase() == strings_1[i+1][0].toLowerCase() || note_i.toLowerCase() == strings_1[i+1][1].toLowerCase()) {
			document.getElementById(strings_1[i+1][1]).checked = "checked"
		} else if (note_i.toLowerCase()!=strings_1[i+1][0]){
			$("#"+strings_1[i+1][0]).prop('checked', false);
		}
	}
}
function changeText(){
	if (isRadio) {
		let textOutput = document.getElementById('text').innerHTML
		document.getElementById('search_note').value = textOutput.slice(0,textOutput.indexOf(" "))
	}
}

function showDef(){
	if (!isDef){
		$("#interval_def").css({"visibility": "visible"})
		$("#wiki").css({"visibility": "visible"})
		$("#left").attr('src', 'right.jpg')
		isDef = true;
	} else {
		$("#interval_def").css({"visibility": "hidden"})
		$("#wiki").css({"visibility": "hidden"})
		$("#left").attr('src', 'left.jpg')
		isDef = false;
	}
}