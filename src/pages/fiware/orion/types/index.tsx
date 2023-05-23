import { Layout } from "@/components/Layout";
import { useAxios } from "@/hooks/useAxios";
import { useNgsiV2 } from "@/hooks/useNgsiV2";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function FiwareOrionTypesIndex() {


  // const {data: session, status } = useSession();


  const { api } = useNgsiV2();

  api.typesApi.listEntityTypes().then((res) => {
    console.log(res);
  });

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error!</p>

  return <Layout><>test</></Layout>;
}
