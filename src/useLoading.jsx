import { useState } from "react";
import unionBy from "lodash.unionby";

export const useLoading = (loadData) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [data, setData] = useState([]);
  const [cursor, setCursor] = useState(0);
  const count = 4;
  const handleError = () => {};

  const onLoading = async () => {
    setIsLoading(true);
    try {
      const dataList = await loadData(cursor, count);
      const newCursor = cursor + count;
      setData((prev) => unionBy(prev, dataList.data, "_id"));
      setCursor(newCursor);
      if (newCursor >= dataList.count) {
        setShowLoadMore(false);
      }
    } catch (e) {
      handleError(e);
    }
    setIsLoading(false);
  };

  return { data, isLoading, showLoadMore, onLoading, setData };
};
