import { Posts } from "@/types/video";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppWrite = (fn: any) => {
  const [data, setData] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response: Posts[] = await fn();
      setData(response);
    } catch (error: any) {
      Alert.alert("Error", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, refetch, loading };
};
export default useAppWrite;
