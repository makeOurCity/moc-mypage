import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

interface PostmanWidgetProps {
  collectionId: string;
  environment?: string;
  width?: string | number;
  height?: string | number;
}

declare global {
  interface Window {
    PostmanCollection: any;
  }
}

export default function PostmanWidget({
  collectionId,
  environment,
  width = "100%",
  height = "500px"
}: PostmanWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !window.PostmanCollection) return;

    const container = containerRef.current;
    const collection = new window.PostmanCollection({
      container: container,
      collection: collectionId,
      environment: environment,
      width: width,
      height: height
    });

    return () => {
      // クリーンアップ関数
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [collectionId, environment, width, height]);

  return (
    <Box
      ref={containerRef}
      width={width}
      height={height}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      overflow="hidden"
    />
  );
}
