const myModal = new bootstrap.Modal(
  document.querySelector("#modalQuestionCreate")
);

const questionForm = document.querySelector("#question");
const createEditQuestionForm = document.querySelector(
  "#createEditQuestionForm"
);

const createQuestion = async (event) => {
  myModal.show();
};

const editQuestion = async (event) => {
  const { id, question, surveyId } = event.target.dataset;
  questionForm.value = question;
  isCreating.value = id;
  myModal.show();
};

createEditQuestionForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    question: questionForm.value,
  };

  let url, method;

  if (!isCreating.value) {
    const surveyId = e.target.dataset.id;
    console.log("surveyId ON CREATE");
    console.log(surveyId);
    url = `http://localhost:8000/api/surveys/${surveyId}/questions`;
    method = "POST";
  } else {
    url = `http://localhost:8000/api/questions/${isCreating.value}/update`;
    method = "PUT";
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const respToJson = await response.json();

  console.log(respToJson);
  myModal.hide();
  createEditQuestionForm.reset();

  if (!respToJson.question.id) {
    listQuestions.innerHTML += `
        <tr id="row-q-${respToJson.question.id}">
        <th scope="row">
            ${respToJson.question.id}
        </th>
        <td>
            ${respToJson.question.question}
        </td>
        <td>
            <button onclick=editQuestion(event) class="btn btn-outline-success" data-id="${respToJson.question.id}" data-question="${respToJson.question.question}" data-surveyId="${respToJson.question.surveyId}">Editar</button>
            <a href="/questions/${respToJson.question.id}/show" class="btn btn-outline-primary">Ver</a>

        </td>
        </tr>
    `;
  } else {
    const row = document.querySelector(`#row-q-${respToJson.question.id}`);
    row.innerHTML = `
    <tr id="row-q-${respToJson.question.id}">
    <th scope="row">
        ${respToJson.question.id}
    </th>
    <td>
        ${respToJson.question.question}
    </td>
    <td>
        <button onclick=editQuestion(event) class="btn btn-outline-success" data-id="${respToJson.question.id}" data-question="${respToJson.question.question}" data-surveyId="${respToJson.question.surveyId}">Editar</button>
        <a href="/questions/${respToJson.question.id}/show" class="btn btn-outline-primary">Ver</a>

    </td>
    </tr>
`;
  }
});
