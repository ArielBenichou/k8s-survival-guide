import { UseQueryResult } from "@tanstack/react-query";
import React from "react";

export default function QueryContainer<T>({ query, children }: Props<T>) {
  if (query.isError) {
    return (
      <div className="rounded w-full bg-red-100 border border-red-500 text-red-600 p-3 text-center">
        Error Loading Data
      </div>
    )
  }

  if (query.isLoading || !query.data) {
    return (
      <div className="p-3 rounded w-full flex justify-center items-center">
        Loading...
      </div>
    )
  }

  return (
    <>
      {children(query.data)}
    </>
  );
}

interface Props<T> {
  children: (data: T) => React.ReactNode;
  query: UseQueryResult<T, Error>
}
