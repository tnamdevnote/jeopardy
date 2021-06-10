let WIDTH = 6;
let HEIGHT = 5;
const button = document.querySelector('.button__start');
const board = document.querySelector('.board');

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

let categories = {};


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

const fillTable = async (rowIndex, row, categoryId, categoryObj) => {
  categoryObj = categoryObj || 0;
  const data = document.createElement('td');
  data.setAttribute('id', `${categoryId}r${rowIndex}`);
  data.setAttribute('class', row.getAttribute('class'));
  data.innerHTML =  row.getAttribute('class') === 'board__thead__0' ? categoryObj.title.toUpperCase() : '?';
  row.append(data);
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

const handleClick = (eventTarget) => {
  const eventTargetId = eventTarget.id.split('r')[0];
  const clues = categories[eventTargetId].clues.slice(0, HEIGHT);
  const rowNumber = parseInt(eventTarget.classList.value.split('__')[2]);
  const targetClue = clues[rowNumber];
  
  if(!targetClue['showing']) {
    eventTarget.innerHTML = targetClue['question'];
    targetClue['showing'] = 'question';
  } 
  else if (targetClue['showing'] === 'question') {
    eventTarget.innerHTML = targetClue['answer'];
    targetClue['showing'] = 'answer';
    eventTarget.classList.add('answer');
  }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

const showLoadingView = () => {
  button.setAttribute('class', 'button__loading')
  button.innerHTML = 'Loading...';
}

/** Remove the loading spinner and update the button used to fetch data. */

const hideLoadingView = () => {
  button.setAttribute('class', 'button__restart')
  button.innerHTML = 'Restart'
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

const setupAndStart = async () => {
  // Set up a HTML board
  const thead = document.createElement('thead');
  thead.setAttribute('class', 'board__thead');

  const tbody = document.createElement('tbody');
  tbody.setAttribute('class', 'board__tbody');

  

  // get random category Ids
  const categoryIds = await getCategoryIds();
  
  // For each row (including table header), get data for each category and fill out the table.
  for (let rowIndex = 0; rowIndex < HEIGHT+1; rowIndex++) {
    const row = document.createElement('tr');
    
    for (categoryId of categoryIds) {
      if (rowIndex === 0) {
        const categoryObj = await getCategory(categoryId);
        row.setAttribute('class', `board__thead__${rowIndex}`);
        thead.append(row);
        fillTable(rowIndex, row, categoryId, categoryObj);
        categories[categoryId] = categoryObj;
      } else {
        row.setAttribute('class', `board__tbody__${rowIndex-1}`)
        tbody.append(row);
        fillTable(rowIndex-1, row, categoryId);
      }
    }
  }

  board.append(thead, tbody);
}

/** On click of start / restart button, set up game. */

// TODO
button.addEventListener('click', async evt => {
  if(evt.target.getAttribute('class') === 'button__restart') {
    evt.target.className = 'button__start';
    board.innerHTML = '';
    categories = {};
  }

  if(evt.target.getAttribute('class') === 'button__start') {
    showLoadingView();
    await setupAndStart();
    hideLoadingView();
  }
  

  
})

/** On page load, add event handler for clicking clues */

// TODO
board.addEventListener('click', evt => {
  handleClick(evt.target);
})