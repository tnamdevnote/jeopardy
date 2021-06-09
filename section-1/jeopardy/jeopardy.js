let WIDTH = 6;
let HEIGHT = 5;
const button = document.querySelector('.button');

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

const getCategoryIds = async () => {
  const results = await axios.get('https://jservice.io/api/random', { params: { count: WIDTH } });
  const categoryIds = results.data.map(x => x.category_id);
  return categoryIds;
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

const getCategory = async (categoryId) => {
  const results = await axios.get('https://jservice.io/api/category', { params: { id: categoryId } });
  const categoryObj = {
    title: results.data.title,
    clues: results.data.clues.map(clue => ({ question: clue.question, answer: clue.answer, showing: null }))
  };
  return categoryObj;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

const fillTable = async (row, categoryId, categoryObj) => {
  categoryObj = categoryObj || 0;
  const data = document.createElement('td');
  data.setAttribute('id', categoryId);
  data.innerHTML =  row.getAttribute('class') === 'board__thead__row' ? categoryObj.title.toUpperCase() : '?';
  console.log(data)
  row.append(data);
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

const setupAndStart = async () => {
  // Set up a HTML board
  const board = document.querySelector('.board');

  const thead = document.createElement('thead');
  thead.setAttribute('class', 'board__thead');

  const tbody = document.createElement('tbody');
  tbody.setAttribute('class', 'board__tbody');

  board.append(thead, tbody);

  // get random category Ids
  const categoryIds = await getCategoryIds();
  const categories = categoryIds.map(async categoryId => await getCategory(categoryId));
  // For each row (including table header), get data for each category and fill out the table.
  for (let i = 0; i < HEIGHT+1; i++) {
    const row = document.createElement('tr');
    
    for (categoryId of categoryIds) {
      if (i === 0) {
        const categoryObj = await getCategory(categoryId);
        row.setAttribute('class', 'board__thead__row');
        thead.append(row);
        fillTable(row, categoryId, categoryObj);
        categories.push(categoryObj);
      } else {
        row.setAttribute('class', 'board__tbody__row')
        tbody.append(row);
        fillTable(row, categoryId);
      }
    }
  }  
}

/** On click of start / restart button, set up game. */

// TODO
button.addEventListener('click', evt => {
  setupAndStart();

})

/** On page load, add event handler for clicking clues */

// TODO