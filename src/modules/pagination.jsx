import React, { useState } from "react";
import { useQuery } from "react-query";

import UserTable from "../components/UserTable";

const pageLimit = 15;

const fetchUsers = async (page = 1) => {
  const response = await fetch(
    `http://16.171.239.100:3000/photos?page=${page}&_limit=${limit}`
  );
  return response.json();
};

function PaginatedQuery() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, status, error } = useQuery(
    ["paginatedUsers", page],
    () => fetchUsers(page),
    {
      keepPreviousData: true,
    }
  );

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <h2>Paginated Query Example</h2>
      <div>
        {isError && <div>{error.message}</div>}

        {isLoading && <div>Loading...</div>}

        {status === "success" && <UserTable users={data} />}
      </div>

      {/* start of pagination buttons */}
      <div>
        <button onClick={prevPage} disabled={page <= 1}>
          Prev
        </button>
        <span>Page: {page}</span>
        <button onClick={nextPage} disabled={data && data.length < pageLimit}>
          Next
        </button>
      </div>
      {/* end of pagination buttons */}
    </div>
  );
}

export default PaginatedQuery;