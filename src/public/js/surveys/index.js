const listSurveys = document.getElementById("listSurveys");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await fetchSurveys();

    showSurveys(data)
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
    listSurveys.innerHTML += `
                  <tr id="row-q-${survey.id}">
                      <th scope="row">
                        ${index + 1}
                      </th>
                      <td>
                        ${survey.title}
                      </td>
                      <td>
                        ${survey.description}
                      </td>
                      <td>
                        <button onclick=editSurvey(event) class="btn btn-outline-success" data-id="${survey.id}" data-title="${survey.title}" data-description="${survey.description}">Editar</button>
                        <a href="/surveys/${survey.id}/show" class="btn btn-outline-primary">Ver</a>
                      </td>
                   </tr>
              `;
  });
};