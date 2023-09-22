import DataTableCard from "@/components/card/DataTable";
import { useMocApi } from "@/hooks/useMocApi";
import { useEffect, useState } from "react";


export default function MocAppInfoTable() {
  const { mocApi } = useMocApi();

  const [basicData, setBasicData] = useState<{[key:string]: string}>({});

  useEffect(() => {
    mocApi.get('/api/info').then((res) => {
      setBasicData(res.data);
    })
  }, []);

  return (
      <DataTableCard title="接続情報" data={basicData} />
  );
}
