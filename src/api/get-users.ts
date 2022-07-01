import localforage from 'localforage'
import { z } from 'zod'

// Cuidado: essa chave não pode ser pública. Está aqui somente para facilitar
// os exemplos. Para usar corretamente a API do GitHub, você deveria
// ter um backend que vai guardar essa chave, fazer as request para o
// GitHub, e à partir do seu frontend, você faz requests no seu backend
// e pega as informações.
const githubToken = import.meta.env.VITE_GITHUB_API_TOKEN ?? ''

const userDataSchema = z.object({
  id: z.number(),
  arroz: z.string(),
  avatar_url: z.string(),
})

type UserData = z.infer<typeof userDataSchema>

export async function getUser (user: string): Promise<UserData> {
  const userData = await getUserFromCacheOrSource(user)
  try {
    return userDataSchema.parse(userData)
  } catch (e) {
    if (e instanceof z.ZodError) {
      // verificar se zod tem algum parser para as mensagens de erro
      const parsedError = JSON.parse(e.message)
      console.log('e:', parsedError)
    }

    throw new Error('Invalid schema')
  }
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
