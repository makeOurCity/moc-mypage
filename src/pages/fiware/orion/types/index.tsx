import { Layout } from "@/components/Layout";
import { useAxios } from "@/hooks/useAxios";
import { getSession } from "next-auth/react";
import { useEffect } from "react";

export default function FiwareOrionTypesIndex() {
  useEffect(() => {
  })

  const [{ data, loading, error }, refetch] = useAxios('/v2/entities');

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error!</p>

  return <Layout><>test</></Layout>;
}
