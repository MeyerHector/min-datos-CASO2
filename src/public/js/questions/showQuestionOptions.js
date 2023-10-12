const listOptions = document.querySelector('#listOptions')

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOMContentLoaded");
  try {
    const data = await fetchOptions();
    showOptions(data);
  } catch (error) {
    console.log("DOMContentLoaded ERROR");
    console.log(error);
  }
});

const fetchOptions = async () => {
  const questionId = id.dataset.id;

  const response = await fetch(`http://localhost:8000/api/questions/${questionId}/options`);
  console.log(response.status);
  if (response.status !== 200) {
    return [];
  }
  const data = await response.json();
  return data;
};

const showOptions = (options) => {
  console.log(options)
  if (options.length === 0) {
    listOptions.innerHTML = `
          <tr id="row-q-empty">
              <td colspan="6" class="text-center">No hay opciones registradas aún.</td>
          </tr>
      `;
    return;
  }

  options.forEach((option, index) => {
    listOptions.innerHTML += `
                  <tr id="row-q-${option.id}">
                      <th scope="row">
                        ${index + 1}
                      </th>
                      <td>
                        ${option.option}
                      </td>
                      <td>
                        <button onclick=editOption(event) class="btn btn-outline-success" data-id="${option.id}" data-option="${option.option}" data-questionId="${option.questionId}">Editar</button>
                        <a href="/questions/${option.id}/show" class="btn btn-outline-primary">Ver</a>
                      </td>
                   </tr>
              `;
  });
};
