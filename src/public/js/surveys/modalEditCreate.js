const myModal = new bootstrap.Modal(
  document.querySelector("#modalSurveyCreate")
);

const titleForm = document.querySelector("#title");
const descriptionForm = document.querySelector("#description");
const createEditSurveyForm = document.querySelector("#createEditSurveyForm");
let isCreating;
const createSurvey = async (event) => {
  isCreating = 0;
  myModal.show();
};

const editSurvey = async (event) => {
  const { id, title, description } = event.target.dataset;
  titleForm.value = title;
  descriptionForm.value = description;
  isCreating = id;
  myModal.show();
};

createEditSurveyForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    title: titleForm.value,
    description: descriptionForm.value,
  };

  let url, method;

  if (!isCreating) {
    url = `http://localhost:8000/api/surveys`;
    method = "POST";
  } else {
    url = `http://localhost:8000/api/surveys/${isCreating}/update`;
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
  createEditSurveyForm.reset();

  if (!isCreating) {
    const empty = document.querySelector(`#row-q-empty`);
    console.log(empty);
    empty != null ? listSurveys.removeChild(empty) : "";
    listSurveys.innerHTML += `
      <tr id="row-q-${respToJson.survey.id}">
          <th scope="row">
            ${respToJson.survey.id}
          </th>
          <td>
            ${respToJson.survey.title}
          </td>
          <td>
            ${respToJson.survey.description}
          </td>
          <td>
          <button onclick=editSurvey(event) class="btn btn-outline-success" data-id="${respToJson.survey.id}" data-title="${respToJson.survey.title}" data-description="${respToJson.survey.description}">Editar</button>
          <a href="/surveys/${respToJson.survey.id}/show" class="btn btn-outline-primary">Ver</a>        
          </td>
       </tr>
  `;
  } else {
    const row = document.querySelector(`#row-q-${respToJson.survey.id}`);
    row.innerHTML = `
        <tr id="row-q-${respToJson.survey.id}">
            <th scope="row">
              ${respToJson.survey.id}
            </th>
            <td>
              ${respToJson.survey.title}
            </td>
            <td>
              ${respToJson.survey.description}
            </td>
            <td>
                <button onclick=editSurvey(event) class="btn btn-outline-success" data-id="${respToJson.survey.id}" data-title="${respToJson.survey.title}" data-description="${respToJson.survey.description}">Editar</button>
                <a href="/surveys/${respToJson.survey.id}/show" class="btn btn-outline-primary">Ver</a>
          
            </td>
         </tr>
    `;
  }
});
