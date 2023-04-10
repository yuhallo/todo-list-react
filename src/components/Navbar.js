import React from "react";
import styled from "styled-components";
import Search from "./Search";

const StyledNav = styled.nav`
  width: 18rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 0px 30px 30px 0px;
  > .nav-explain {
    margin-top: 50px;
    padding: 40px 40px 20px 50px;
    font-size: 24px;
  }
  > .nav-all {
    margin-bottom: 30px;
    border: 2px solid black;
    border-radius: 30px;
    padding: 8px 20px 8px 20px;
    background-color: #ecbc57;
  }
  > .nav-all:hover {
    cursor: pointer;
    background-color: #fde3ae;
  }
  > .nav-all:active {
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px inset;
  }
  > .nav-done {
    border: 2px solid black;
    border-radius: 30px;
    padding: 8px 20px 8px 20px;
    background-color: #8bb897;
  }
  > .nav-done:hover {
    cursor: pointer;
    background-color: #b2e2bf;
  }
  > .nav-done:active {
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px inset;
  }
`;

function Navbar({ setTaskList, handleSearch }) {
  const onClickNav = (type) => {
    if (type === "all") {
      fetch("http://localhost:3002/data")
        .then((res) => res.json())
        .then((data) => {
          setTaskList(data);
        });
    } else if (type === "done") {
      setTaskList((prev) => prev.filter((a) => a.complete));
    }
  };

  return (
    <StyledNav>
      <p className="nav-explain">👀 Click the tab to see the list you want!</p>
      <div className="nav-all" onClick={() => onClickNav("all")}>
        TODO-LIST
      </div>
      <div className="nav-done" onClick={() => onClickNav("done")}>
        DONE-LIST
      </div>
      <Search handleSearch={handleSearch} />
    </StyledNav>
  );
}

export default Navbar;
