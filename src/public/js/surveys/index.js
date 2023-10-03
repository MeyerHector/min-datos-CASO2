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
          <tr>
              <td colspan="6" class="text-center">No hay categorías registradas aún.</td>
          </tr>
      `;
      return;
    }
  
    surveys.forEach((survey) => {
      listSurveys.innerHTML += `
                  <tr>
                      <th scope="row">
                        ${survey.id}
                      </th>
                      <td>
                        ${survey.title}
                      </td>
                      <td>
                        ${survey.description}
                      </td>
                      <td>
                      <a href="/surveys/${survey.id}/edit" class="btn btn-outline-success">Editar</a>
                      <a href="/surveys/${survey.id}/show" class="btn btn-outline-primary">Ver</a>
                      </td>
                   </tr>
              `;
    });
  };