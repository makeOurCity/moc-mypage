import { useSession } from "next-auth/react";
import GravatarIcon from "../gravatar/icon";


export default function HeaderIcon() {
  const {data: session} = useSession();

  return (
    <GravatarIcon email={session?.user?.email || "example@example.com"}></GravatarIcon>
  )

}
