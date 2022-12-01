import API from './API.js'

var users = [];

const displayUser = () => {

    let userList = document.getElementById('userList')
    userList.innerHTML = '';
    users.forEach((user, index) => {
        let userDiv = document.createElement('div')

        let usernameSpan  = document.createElement('span')
        usernameSpan.innerText = user.name;
        userDiv.appendChild(usernameSpan);

        let userImg = document.createElement('img');
        userImg.src = user.avatar;
        // console.log(userImg);
        userDiv.appendChild(userImg)

        let deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'Delete';
        userDiv.appendChild(deleteBtn);
        
        deleteBtn.addEventListener('click', () => {
            deleteUser(user.id, index)
        })

        userList.appendChild(userDiv)

    })

}

// async function deleteUser ( userId, index) {
//     let deleteUser = await API.delete('user/' + userId)
//
//     users.splice('index', 1)
//     displayUser()
// }

// Search user function
API.get('/posts')
.then(usersFromServer => {
    users = usersFromServer;
    // console.log(users);
    displayUser();
    
})

// console.log(users);

// API.post('users', )

// bo m viet
async function generateUser() {
  const users = await API.get('/posts');

  generateHtml(users)
}

function generateHtml(users) {
  const tableParent = document.querySelector('.table-user');

  const userContent = users.map(user => (`
    <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td><img class="avatar" src=${user.avatar} /></td>
            <td>
              <button user-id=${user.id} class="delete">Delete</button>
               <button user-id=${user.id} class="edit">Edit</button>
            </td>
        </tr>
  
  `));

  tableParent.innerHTML =  `
       <table id="user-List">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Avatar</th>
            <th>Manage</th>
        </tr>
       ${userContent.join('')}
    </table>
  
  `
}

async function createUser() {
  const submitBtn = document.querySelector('.submit')
  const userNameInput = document.querySelector('#userName')
  const userAvatarInput = document.querySelector('#userAvatar')

  submitBtn.addEventListener('click', async () => {
    const userAvatar = userAvatarInput.value
    const userName = userNameInput.value

    await API.post('/posts', {
      name: userName,
      avatar: userAvatar
    })
    userAvatarInput.value = ''
    userNameInput.value = ''
    await generateUser()
  })
}

async function deleteUser() {
  const deleteBtns = document.querySelectorAll('.delete');
  deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', async (e) => {
      const userId = e.target.getAttribute('user-id');
      await API.delete(`/posts/${userId}`);
      await generateUser();
    })
  })
}

async function editUser() {
  const editBtns = document.querySelectorAll('.edit');
  editBtns.forEach(editBtn => {
    editBtn.addEventListener('click', async (e) => {
      const userId = e.target.getAttribute('user-id');
      const currentUser = await API.get(`/posts/${userId}`)
      const userNameInput = document.querySelector('#userName')
      const userAvatarInput = document.querySelector('#userAvatar')
      const updateBtn = document.querySelector('.update')

      userAvatarInput.value = currentUser.avatar;
      userNameInput.value = currentUser.name;

      updateBtn.addEventListener('click', async () => {
          const currentUserAvatar = userAvatarInput.value;
          const currentUserName = userNameInput.value;
          await API.update(`/posts/${userId}`, {
            name: currentUserName,
            avatar: currentUserAvatar
          })

        userAvatarInput.value = ''
        userNameInput.value = ''
        await generateUser()
      })
    })
  })
}

async function searchUser() {
  const users = await API.get('/posts');
  const searchInput = document.querySelector('#userSearch')
  const searchBtn = document.querySelector('.search')
    searchBtn.addEventListener('click', () => {
      const searchInputValue = searchInput.value;
      const userFiltered = users.filter(user => user.name.toLowerCase().includes(searchInputValue.toLowerCase()))

      generateHtml(userFiltered)
    })
}

async function startServer() {
  await generateUser();
  createUser()
  deleteUser()
  editUser()
  searchUser()
}


startServer()