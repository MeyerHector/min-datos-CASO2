const listQuestions = document.querySelector('#listQuestions')

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOMContentLoaded");
  try {
    const data = await fetchQuestions();
    console.log(data);
    showQuestions(data);
  } catch (error) {
    console.log("DOMContentLoaded ERROR");
    console.log(error);
  }
});

const fetchQuestions = async () => {
  const surveyId = id.dataset.id;

  const response = await fetch(`http://localhost:8000/api/surveys/${surveyId}/questions`);
  console.log('response');
  if (response.status !== 200) {
    return [];
  }
  const data = await response.json();
  return data;
};

const showQuestions = (questions) => {
  console.log(questions)
  if (questions.length === 0) {
    listQuestions.innerHTML = `
          <tr id="row-q-empty">
              <td colspan="6" class="text-center">No hay preguntas registradas aún.</td>
          </tr>
      `;
    return;
  }

  questions.forEach((question, index) => {
    listQuestions.innerHTML += `
                  <tr id="row-q-${question.id}">
                      <th scope="row">
                        ${index + 1}
                      </th>
                      <td>
                        ${question.question}
                      </td>
                      <td>
                        <button onclick=editQuestion(event) class="btn btn-outline-success" data-id="${question.id}" data-question="${question.question}" data-surveyId="${question.surveyId}">Editar</button>
                        <a href="/questions/${question.id}/show" class="btn btn-outline-primary">Ver</a>
                      </td>
                   </tr>
              `;
  });
};
