import { Layout } from "@/components/layouta";
import { useAxios } from "@/hooks/useAxios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function FiwareOrionTypesIndex() {


  const {data: session, status } = useSession();


  const [{ data, loading, error }, refetch] = useAxios({
    url: '/v2/types',
    method: 'GET',
    // headers: {
    //   Authorization: session?.idToken
    // }
  });


  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error!</p>

  return <Layout><>test</></Layout>;
}
