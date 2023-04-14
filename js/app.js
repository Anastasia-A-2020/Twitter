// На кожній картці повинна бути іконка або кнопка, яка дозволить видалити цю картку зі сторінки.
// При натисканні на неї необхідно надіслати DELETE запит на адресу https://ajax.test-danit.com/api/json/posts/${postId}.
// Після отримання підтвердження із сервера(запит пройшов успішно), картку можна видалити зі сторінки, використовуючи JavaScript.
// Більш детальну інформацію щодо використання кожного з цих зазначених вище API можна знайти тут.

// const API_URL = "https://ajax.test-danit.com/api/json/";

const cardsList = document.querySelector(".card-list");
const users = getUsersAndPosts()
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
          usersMarkup.push(userCard.renderCard());
        }
      }
    }
    return usersMarkup.join("");
  })
  .then(res => cardsList.insertAdjacentHTML("afterbegin", res));

class Card {
  constructor({ name, mail, title, post }) {
    this.name = name;
    this.mail = mail;
    this.title = title;
    this.post = post;
  }

  renderCard() {
    return `<li class='card__item'>
      <span>${this.name}</span>
      <a href='mail:${this.mail}' target='_blank'>${this.mail}</a>
      <h2>${this.title}</h2>
      <p>${this.post}</p>
      <button type='button' data-action='delete'>Delete</button>
    </li>
    `;
  }
}

async function getUsersAndPosts() {
  try {
    const users = await fetch(
      "https://ajax.test-danit.com/api/json/users"
    ).then(response => response.json());
    const posts = await fetch(
      "https://ajax.test-danit.com/api/json/posts"
    ).then(response => response.json());
    return { users, posts };
  } catch (error) {
    console.log(error);
  }
}

// function showUsersAndPosts() {

// }
