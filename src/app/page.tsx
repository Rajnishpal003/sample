// app/chat/page.tsx (Server Component)
import { auth0 } from '../lib/auth0'
import ChatClient from './ChatClient'

export default async function ChatPage() {
  const session = await auth0.getSession()

  return <ChatClient session={session} />
}
