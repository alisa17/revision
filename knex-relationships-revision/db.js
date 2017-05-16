module.exports = {
  getUser,
  getUsers,
  getProfile,
  addUser,
  addProfile
}

function getUsers(connection) {
  return connection('users').select()
}

function getUser(id, connection) {
  return connection('users').where('id', id)
}

function getProfile(id, connection) {
  return connection('profiles').where('profiles.user_id', id)
    .join('users', 'users.id', '=', 'profiles.user_id')
  .join('posts', 'users.id', '=', 'posts.user_id')
  .select('users.name', 'profiles.profile_picture', 'posts.*')
}



function addUser(name, email, connection) {
  return connection('users')
    .insert({
      name: name,
      email: email
    })
}

function addProfile(user_id, connection) {
  return connection('profiles')
    .insert({
      user_id: user_id,
      profile_picture: `user${user_id}.png`,
      url: `/profile/${user_id}`
    })
}
