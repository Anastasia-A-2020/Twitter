// option task

const mask = document.querySelector(".mask");
const addPostBtn = document.querySelector("[data-action='open-modal-btn']");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");
const form = document.querySelector(".modal");

addPostBtn.addEventListener("click", onAddPostBtnClick);
modal.addEventListener("click", addPost);
window.addEventListener("DOMLoadContent", onLoad);

function onLoad() {
  mask.classList.add("hide");
}

function onAddPostBtnClick(e) {
  backdrop.classList.remove("is-hidden");
}

function getDataForAddPost() {
  const dataForPost = {
    id: 1,
    userId: 1,
    title: form.elements.modalTitle.value,
    body: form.elements.modalText.value,
  };
  form.reset();
  return dataForPost;
}

function addPost(e) {
  e.preventDefault();

  if (e.target.dataset.action === "add-post") {
    backdrop.classList.add("is-hidden");

    const postToAdd = getDataForAddPost();

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(postToAdd),
        headers: { "Content-Type": "application/json" },
      };

      fetch(`${API_URL}/posts`, options)
        .then(response => response.json())
        .then(post => {
          const userCard = new Card({
            name: "Leanne Graham",
            mail: "Sincere@april.biz",
            title: post.title,
            post: post.body,
          });
          cardsList.insertAdjacentHTML(
            "afterbegin",
            userCard.renderCard(post.id)
          );
        });
    } catch (error) {
      console.error(error);
    }
  }
}
