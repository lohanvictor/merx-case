"use client";

import { useMemo, useState } from "react";

export type GenericTableColumn<T> = {
  key: string;
  label: string;
  render?: (data: T) => React.ReactNode;
  sortable?: boolean;
};

export type GenericTableProps<T> = {
  data: Array<T | any>;
  columns: Array<GenericTableColumn<T>>;
  loading?: boolean;
};

function compare(a: any, b: any, key: string, direction: "up" | "down") {
  const aValue = a[key];
  const bValue = b[key];

  if (aValue < bValue) return direction === "up" ? -1 : 1;
  if (aValue > bValue) return direction === "up" ? 1 : -1;
  return 0;
}

export default function GenericTable<T>(props: GenericTableProps<T>) {
  const [sort, setSort] = useState<{
    key: string;
    direction: "up" | "down";
  } | null>(null);

  const filteredData = useMemo(() => {
    if (!sort) return props.data;

    return [...props.data].sort((a, b) =>
      compare(a, b, sort.key, sort.direction)
    );
  }, [sort?.direction, sort?.key, sort]);

  function handleSort(key: string) {
    setSort((prev) => {
      if (prev && prev.key === key) {
        return { key, direction: prev.direction === "up" ? "down" : "up" };
      }
      return { key, direction: "up" };
    });
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="odd:bg-gray-50">
          {props.columns.map((item, index) => (
            <th
              key={index}
              className="text-left md:text-lg 2xl:text-xl text-gray-900 p-2 2xl:p-4"
            >
              {item.label}
              {item.sortable && (
                <button
                  onClick={() => handleSort(item.key)}
                  className="hover:cursor-pointer ml-1"
                >
                  {sort?.key === item.key
                    ? sort.direction === "up"
                      ? "↑"
                      : "↓"
                    : "↑"}
                </button>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredData.map((item, index) => (
          <tr
            className="even:bg-gray-50 border-y border-gray-200 hover:bg-green-50"
            key={index}
          >
            {props.columns.map((column) => (
              <td
                key={column.key}
                className="text-left md:text-lg 2xl:text-xl text-gray-900 p-2 2xl:p-4"
              >
                {column.render ? column.render(item) : item[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
