const API_URL = "https://ajax.test-danit.com/api/json/";
const cardsList = document.querySelector(".card-list");

cardsList.addEventListener("click", onDeleteBtnClick);

getUsersAndPosts()
  .then(data => {
    const usersMarkup = [];
    for (let user of data.users) {
      for (let post of data.posts) {
        if (post.userId === user.id) {
          const userCard = new Card({
            name: user.name,
            mail: user.email,
            title: post.title,
            post: post.body,
          });
          usersMarkup.push(userCard.renderCard(post.id));
        }
      }
    }
    return usersMarkup.join("");
  })
  .then(async res => {
    await cardsList.insertAdjacentHTML("afterbegin", res);
    mask.remove();
  });

class Card {
  constructor({ name, mail, title, post }) {
    this.name = name;
    this.mail = mail;
    this.title = title;
    this.post = post;
  }

  renderCard(id) {
    const DEFAULT_PHOTO =
      "data:image/jpeg;base64,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";
    return `<li class='card__item'>
      <img class='card__img' src=${DEFAULT_PHOTO} alt='user photo' width='70' height='70'>
      <div class='card__box'>
      
      <p class='card__user-info'><h2 class='card__name'>${this.name}</h2>
      <svg class='card__icon'>
      <use href='../images/symbol-defs.svg#verified'/>
      </svg>
      <a href='mailto:${this.mail}' class='card__link'>${this.mail}</a>
      </p>
      <h3 class='card__title'>${this.title}</h3>
      <p id=${id}>${this.post}</p>
      
      </div>
      <button type='button' data-action='delete' class='card__delete'>
      Delete
      </button>
      </li>
    `;
  }
}

function onDeleteBtnClick(e) {
  if (e.target.dataset.action === "delete") {
    deleteUsersPost(e.target.previousElementSibling.id);
    e.target.parentElement.remove();
  }
}

async function getUsersAndPosts() {
  try {
    const users = await fetch(`${API_URL}/users`).then(response =>
      response.json()
    );
    const posts = await fetch(`${API_URL}/posts`).then(response =>
      response.json()
    );
    return { users, posts };
  } catch (error) {
    console.error(error);
  }
}

async function deleteUsersPost(postId) {
  try {
    const options = {
      method: "DELETE",
    };
    const response = await fetch(`${API_URL}/posts/${postId}`, options);
    if (response.ok) {
      console.log(`The post with id ${postId} was deleted`);
    }
  } catch (error) {
    console.error(error);
  }
}
