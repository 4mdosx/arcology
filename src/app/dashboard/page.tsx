import session from '@/lib/verifySession'

export default async function Dashboard() {
  const user = await session()
  return <div>Dashboard {JSON.stringify(user)}</div>
}
