import localforage from 'localforage'

// Cuidado: essa chave não pode ser pública. Está aqui somente para facilitar
// os exemplos. Para usar corretamente a API do GitHub, você deveria
// ter um backend que vai guardar essa chave, fazer as request para o
// GitHub, e à partir do seu frontend, você faz requests no seu backend
// e pega as informações.
const githubToken = import.meta.env.VITE_GITHUB_API_TOKEN ?? ''

type UserData = {
  id: number
  bio: string
  avatar_url: string
}

export async function getUser (user: string): Promise<UserData> {
  const userData = await getUserFromCacheOrSource(user)
  if (isUser(userData)) {
    return userData
  }

  throw new Error('Invalid user data')
}

function isUser (userData: any): userData is UserData {
  return typeof userData === 'object' &&
    userData !== null &&
    'bio' in userData &&
    typeof userData.bio === 'string' &&
    'avatar_url' in userData &&
    typeof userData.avatar_url === 'string' &&
    'id' in userData &&
    typeof userData.id === 'number'
}

async function getUserFromCacheOrSource (user: string): Promise<unknown> {
  const cache = await getDataFromCache(user)
  if (cache) {
    return cache
  }

  const userData = await getUserFromGitHub(user)
  await saveInCache({ key: user, data: userData })
  return userData
}

async function getUserFromGitHub (user: string): Promise<unknown> {
  console.log('vai buscar', user, 'no GitHub')
  return fetch(`https://api.github.com/users/${user}`, {
    headers: {
      authorization: `token ${githubToken}`,
      accept: 'application/vnd.github.v3+json',
    },
  })
    .then(r => r.json())
}

async function getDataFromCache (user: string): Promise<unknown> {
  console.log('pegou cache para', user)
  return localforage.getItem(`github-user-${user}`)
}

type SaveInCache = {
  key: string
  data: unknown
}

async function saveInCache ({ key, data }: SaveInCache): Promise<void> {
  await localforage.setItem(`github-user-${key}`, data)
}
