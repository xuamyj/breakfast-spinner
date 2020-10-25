// ---------------
// CONSTANTS: DATA
// ---------------

const menu = [
	{
		name: 'Fruit',
		percent: 15,
	},
	{
		name: 'Toast + eggs, and fruit',
		percent: 15,
	},
	{
		name: 'Just eggs (fried), and fruit',
		percent: 15,
	},
	{
		name: 'Toast + peanut butter, and fruit',
		percent: 5,
	},
	{
		name: 'Toast + jam, and fruit',
		percent: 15,
	},
	{
		name: 'Toast + jam + butter, and fruit',
		percent: 5,
	},
	{
		name: 'Cereal + milk, and fruit',
		percent: 30,
	},
]


// -------------------------------
// FUNCTIONS: MENU-RELATED HELPERS
// -------------------------------

function chooseFoodFromMenu(num) {
	// todo(wonjeo): scope creep as you please
	let sum = 0;
	let item = "";
	for (let i = 0; i < menu.length; ++i) {
		sum += menu[i].percent;
		if (sum > num) {
			item = menu[i].name;
			break;
		}
	}

	// fruit removal
	if (num % 2 === 0) {
		item = item.replace(", and fruit", "");
	}

	return item;
}


// ------------------
// CONSTANTS: STRINGS
// ------------------

const INACTIVE = 'inactive';
const SECTION_INTRO = 'section-intro';
const SECTION_THINKING = 'section-thinking';
const SECTION_FOOD = 'section-food';
const SECTION_NUMBER = 'section-number';
const BUTTON_FIND_OUT = 'button-find-out';
const BUTTON_VIEW_NUMBER = 'button-view-number';
const ANSWER_FOOD = 'answer-food';
const ANSWER_NUMBER = 'answer-number';


// --------------------------
// FUNCTIONS: GENERAL HELPERS
// --------------------------

function displaySection(elementId, shouldDisplay) {
    const sectionDOM = document.getElementById(elementId);
    if (shouldDisplay) {
        sectionDOM.classList.remove(INACTIVE);
    } else {
        sectionDOM.classList.add(INACTIVE);
    }
}

function updateAnswer(elementId, answer) {
	const element = document.getElementById(elementId);
    element.textContent = answer;
}


// -------------------------
// FUNCTIONS: CLICK HANDLERS
// -------------------------

function onClickFindOut() {
    // hide everything
    displaySection(SECTION_THINKING, false);
    displaySection(SECTION_FOOD, false);
    displaySection(BUTTON_VIEW_NUMBER, false);
    displaySection(SECTION_NUMBER, false);

    // show 'Thinking...'
    displaySection(SECTION_THINKING, true);

    // generate number
    let number = Math.floor(Math.random() * 100);
    updateAnswer(ANSWER_NUMBER, number);

    // decide food based on number
    let foodName = chooseFoodFromMenu(number);
    updateAnswer(ANSWER_FOOD, foodName);

    // later, show food and button
    setTimeout(() => {
	    displaySection(SECTION_THINKING, false);
	    
        displaySection(SECTION_FOOD, true);
        displaySection(BUTTON_VIEW_NUMBER, true);
    }, 900);
}

function onClickViewNumber() {
    // show number
    displaySection(SECTION_NUMBER, true);
}

const buttonFindOut = document.getElementById(BUTTON_FIND_OUT);
const buttonViewNumber = document.getElementById(BUTTON_VIEW_NUMBER);

buttonFindOut.addEventListener('click', onClickFindOut);
buttonViewNumber.addEventListener('click', onClickViewNumber);

