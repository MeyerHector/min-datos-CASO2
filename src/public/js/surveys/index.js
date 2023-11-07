const listSurveys = document.getElementById("listSurveys");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await fetchSurveys();

    showSurveys(data);
  } catch (error) {
    console.log("DOMContentLoaded");
    console.log(error);
  }
});

const fetchSurveys = async () => {
  const response = await fetch("http://localhost:8000/api/surveys");
  if (response.status !== 200) {
    return [];
  }

  const data = await response.json();
  return data;
};



const showSurveys = (surveys) => {
  if (surveys.length === 0) {
    listSurveys.innerHTML = `
          <tr id="row-q-empty">
              <td colspan="6" class="text-center">No hay encuestas registradas aún.</td>
          </tr>
      `;
    return;
  }

  surveys.forEach((survey, index) => {
    listSurveys.innerHTML += addRow(survey, index + 1);
  });
};

const updateStatusSurvey = async (event) => {
  const { surveyid, status, index } = event.target.dataset;

  const formData = {
    status: status == "false" ? false : true,
  };

  console.log(formData);

  const url = `http://localhost:8000/api/surveys/${surveyid}/updateStatus`;
  const method = "PATCH";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const respToJson = await response.json();

  const row = document.querySelector(`#row-q-${respToJson.survey.id}`);
  row.innerHTML = addRow(respToJson.survey, index);
};
const addRow = (values, index) => {
  return `
        <tr id="row-q-${values.id}">
            <th scope="row">
              ${index}
            </th>
            <td>
              ${values.title}
            </td>
            <td>
            ${
              values.status
                ? `<button onclick=updateStatusSurvey(event) class="btn btn-outline-success" data-surveyId="${values.id}" data-status="${values.status}" data-index="${index}">Activo</button>`
                : `<button onclick=updateStatusSurvey(event) class="btn btn-outline-danger" data-surveyId="${values.id}" data-status="${values.status}" data-index="${index}">Inactivo</button>`
            }
          </td>
            <td>
              ${values.description}
            </td>
            <td>
                <button onclick=editSurvey(event) class="btn btn-outline-success" data-id="${values.id}" data-title="${values.title}" data-description="${values.description}" data-index="${index}">Editar</button>
                <a href="/admin/surveys/${
                  values.id
                }/show" class="btn btn-outline-primary">Ver</a>
          
            </td>
         </tr>
    `;
};
