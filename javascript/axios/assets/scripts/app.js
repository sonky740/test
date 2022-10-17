const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

async function fetchPosts() {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );

    const listOfPosts = response.data;

    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector('h2').textContent = post.title.toUpperCase();
      postEl.querySelector('p').textContent = post.body;
      postEl.querySelector('li').id = post.id;
      listElement.append(postEl);
    }
  } catch (error) {
    console.error(error.response);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  const fd = new FormData(form);
  // fd.append('title', title);
  // fd.append('body', content);
  fd.append('userId', userId);

  // axios에서는 headers를 생략해도 자동으로 설정해준다.
  const response = await axios.post(
    'https://jsonplaceholder.typicode.com/posts',
    post
  );
  console.log(response);
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

postList.addEventListener('click', async (e) => {
  if (e.target.tagName === 'BUTTON') {
    const post = e.target.closest('li');
    const postId = post.id;
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    post.remove();
  }
});
