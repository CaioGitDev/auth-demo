import { auth, signOut } from '@/auth'

export default async function DashboardPage() {
  const session = await auth()

  return (
    <div>
      <h1>DashboardPage</h1>
      <div>{JSON.stringify(session)}</div>
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  )
}
