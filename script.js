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
        console.log(userImg);
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
    console.log(users);
    displayUser();
    
})

console.log(users);

// API.post('users', )