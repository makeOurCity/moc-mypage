import { Layout } from "@/components/layout";
import { useAxios } from "@/hooks/useAxios";

export default function FiwareOrionTypesIndex() {
  const [{ data, loading, error }, refetch] = useAxios('/v2/types');

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return <Layout><>test</></Layout>;
}
