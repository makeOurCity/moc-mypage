import { useSession, signIn, signOut } from "next-auth/react"
export default function LoginButton() {
  const { data: session, status } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} { status } <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
