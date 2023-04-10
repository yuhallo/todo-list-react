import React from "react";
import { MdSearch } from "react-icons/md";
import styled from "styled-components";

const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  background-color: rgb(233, 233, 233);
  border-radius: 20px;
  padding: 5px;
  margin-top: 1.5em;
  width: 10rem;
  > input {
    border: none;
    width: 7.5rem;
    background-color: rgb(233, 233, 233);
  }
  > input:focus {
    outline: none;
  }
`;

function Search({ handleSearch }) {
  return (
    <StyledSearch>
      <MdSearch className="search-icons" size="1.3em" />
      <input
        onChange={(e) => handleSearch(e.target.value)}
        type="text"
        placeholder="search"
      />
    </StyledSearch>
  );
}

export default Search;
