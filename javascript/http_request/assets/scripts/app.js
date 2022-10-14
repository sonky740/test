const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

async function sendHttpRequest(method, url, data) {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? { 'Content-Type': 'application/json' } : {},
  });

  if (response.status !== 200) return new Error('Something went wrong!');

  return response.json();
}

async function fetchPosts() {
  try {
    const responseData = await sendHttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/posts'
    );

    const listOfPosts = responseData;

    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector('h2').textContent = post.title.toUpperCase();
      postEl.querySelector('p').textContent = post.body;
      postEl.querySelector('li').id = post.id;
      listElement.append(postEl);
    }
  } catch (error) {
    alert(error.message);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
}

fetchButton.addEventListener('click', () => {
  fetchPosts();
});
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const enteredTitle = e.currentTarget.querySelector('#title').value;
  const enteredContent = e.currentTarget.querySelector('#content').value;
  createPost(enteredTitle, enteredContent);
});

postList.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const post = e.target.closest('li');
    const postId = post.id;
    sendHttpRequest(
      'DELETE',
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    post.remove();
  }
});
