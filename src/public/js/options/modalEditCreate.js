const isCreating = document.querySelector("#isCreating");

const myModal = new bootstrap.Modal(
  document.querySelector("#modalOptionCreate")
);

const optionForm = document.querySelector("#option");
const createEditOptionForm = document.querySelector("#createEditOptionForm");

const createOption = async (event) => {
  myModal.show();
};

const editOption = async (event) => {
  const { id, option, questionId } = event.target.dataset;
  optionForm.value = option;
  isCreating.value = id;
  myModal.show();
};

createEditOptionForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    option: optionForm.value,
  };

  let url, method;
  const questionId = e.target.dataset.id;
  if (!isCreating.value) {
    console.log("questionId ON CREATE");
    console.log(questionId);
    url = `http://localhost:8000/api/questions/${questionId}/options`;
    method = "POST";
  } else {
    console.log("questionId and optionId ON Edit");
    console.log(questionId, isCreating.value);
    url = `http://localhost:8000/api/questions/${questionId}/options/${isCreating.value}/update`;
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
  createEditOptionForm.reset();

  if (!isCreating.value) {
    const empty = document.querySelector(`#row-q-empty`);
    empty != null ? listOptions.removeChild(empty) : "";
    listOptions.innerHTML += `
      <tr id="row-q-${respToJson.option.id}">
      <th scope="row">
      ${respToJson.option.id}
      </th>
      <td>
        ${respToJson.option.option}
      </td>
      <td>
        <button onclick=editOption(event) class="btn btn-outline-success" data-id="${
          respToJson.option.id
        }" data-option="${respToJson.option.option}" data-questionId="${
      respToJson.option.questionId
    }">Editar</button>
        <a href="/questions/${
          respToJson.option.id
        }/show" class="btn btn-outline-primary">Ver</a>
      </td>
   </tr>
      `;
  } else {
    const row = document.querySelector(`#row-q-${respToJson.option.id}`);
    row.innerHTML = `
    <tr id="row-q-${respToJson.option.id}">
    <th scope="row">
    ${respToJson.option.id}
    </th>
    <td>
      ${respToJson.option.option}
    </td>
    <td>
      <button onclick=editOption(event) class="btn btn-outline-success" data-id="${
        respToJson.option.id
      }" data-option="${respToJson.option.option}" data-questionId="${
      respToJson.option.questionId
    }">Editar</button>
      <a href="/questions/${
        respToJson.option.id
      }/show" class="btn btn-outline-primary">Ver</a>
    </td>
 </tr>
  `;
  }
});
