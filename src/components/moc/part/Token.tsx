import useAxios from "axios-hooks";

export interface TokenProps {
  defaultBody: string;
}

export default function Token(props: TokenProps) {
  const [
    { data: token, loading: loadingToken, error: getTokenError },
    getToken,
  ] = useAxios({ url: "/api/token", method: "GET" }, { manual: true });
}
