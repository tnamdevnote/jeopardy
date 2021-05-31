let WIDTH = 6;
let HEIGHT = 5;

// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

function getCategoryIds() {
  const categories = axios.get('http://jservice.io/api/random', { params: { count: 5 } })
  console.log(categories.data.map(x => x.category.title))
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

function getCategory(catId) {
  
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

const fillTable = async () => {
  const board = document.querySelector('.board');

  const thead = document.createElement('thead');
  const theadRow = document.createElement('tr');
  thead.setAttribute('class', 'board__thead');
  theadRow.setAttribute('class', 'board__thead__row');
  thead.append(theadRow);
  
  
  for (let x = 0; x < WIDTH; x++) {
    const theadCell = document.createElement('td');
    theadCell.setAttribute('id', x);
    theadCell.innerHTML = x;
    theadRow.append(theadCell);
  }

  const tbody = document.createElement('tbody');
  tbody.setAttribute('class', 'board__tbody');
  
  for (let y = 0; y < HEIGHT; y++) {
    const tbodyRow = document.createElement('tr');
    for (let x = 0; x < WIDTH; x++) {
      const tbodyCell = document.createElement('td');
      tbodyCell.setAttribute('id', `${y}-${x}`)
      tbodyCell.innerHTML = `?`;
      tbodyRow.append(tbodyCell);
    }
    tbody.append(tbodyRow);
  }
  board.append(thead, tbody);
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
}

/** On click of start / restart button, set up game. */

// TODO


/** On page load, add event handler for clicking clues */

// TODO