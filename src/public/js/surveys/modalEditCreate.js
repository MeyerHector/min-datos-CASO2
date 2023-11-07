const myModal = new bootstrap.Modal(
  document.querySelector("#modalSurveyCreate")
);

const titleForm = document.querySelector("#title");
const descriptionForm = document.querySelector("#description");
const createEditSurveyForm = document.querySelector("#createEditSurveyForm");
const isCreating = document.querySelector("#isCreating");
const createSurvey = async (event) => {
  myModal.show();
};

let indexOfRow;

const editSurvey = async (event) => {
  const { id, title, description, index } = event.target.dataset;
  titleForm.value = title;
  descriptionForm.value = description;
  isCreating.value = id;
  indexOfRow = index;
  myModal.show();
};

createEditSurveyForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    title: titleForm.value,
    description: descriptionForm.value,
  };

  let url, method;

  if (!isCreating.value) {
    url = `http://localhost:8000/api/surveys`;
    method = "POST";
  } else {
    url = `http://localhost:8000/api/surveys/${isCreating.value}/update`;
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

  if (!isCreating.value) {
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
          ${
            respToJson.survey.status
              ? `<button onclick=updateStatusSurvey(event) class="btn btn-outline-success" data-surveyId="${respToJson.survey.id}" data-status="${respToJson.survey.status}" data-index="${indexOfRow}">Activo</button>`
              : `<button onclick=updateStatusSurvey(event) class="btn btn-outline-danger" data-surveyId="${respToJson.survey.id}" data-status="${respToJson.survey.status}" data-index="${indexOfRow}">Inactivo</button>`
          }
        </td>
          <td>
            ${respToJson.survey.description}
          </td>
          <td>
          <button onclick=editSurvey(event) class="btn btn-outline-success" data-id="${respToJson.survey.id}" data-title="${respToJson.survey.title}" data-description="${respToJson.survey.description}" data-index="${indexOfRow}">Editar</button>
          <a href="/admin/surveys/${respToJson.survey.id}/show" class="btn btn-outline-primary">Ver</a>        
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
            ${
              respToJson.survey.status
                ? `<button onclick=updateStatusSurvey(event) class="btn btn-outline-success" data-surveyId="${respToJson.survey.id}" data-status="${respToJson.survey.status}" data-index="${indexOfRow}">Activo</button>`
                : `<button onclick=updateStatusSurvey(event) class="btn btn-outline-danger" data-surveyId="${respToJson.survey.id}" data-status="${respToJson.survey.status}" data-index="${indexOfRow}">Inactivo</button>`
            }
          </td>
            <td>
              ${respToJson.survey.description}
            </td>
            <td>
                <button onclick=editSurvey(event) class="btn btn-outline-success" data-id="${respToJson.survey.id}" data-title="${respToJson.survey.title}" data-description="${respToJson.survey.description}" data-index="${indexOfRow}">Editar</button>
                <a href="/admin/surveys/${respToJson.survey.id}/show" class="btn btn-outline-primary">Ver</a>          
            </td>
         </tr>
    `;
  }
});
