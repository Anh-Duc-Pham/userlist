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

async function deleteUser ( userId, index) {
    let deleteUser = await API.delete('user/' + userId)

    users.splice('index', 1)
    displayUser()
}

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
  const tableParent = document.querySelector('.table-user');

  const userContent = users.map(user => (`
    <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td><img class="avatar" src=${user.avatar} /></td>
            <td></td>
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


generateUser()