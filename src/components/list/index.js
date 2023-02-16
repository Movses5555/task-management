import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreateList from "./create";
import ListDetails from "./details";

function List() {
  const listData = useSelector((state) => state.list.data);
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(listData);
  }, [listData]);
  const style = {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "100%",
    height: "90%",
    paddingRight: "1rem",
    overflow: "scroll hidden",
    scrollSnapType: "x mandatory",
    scrollPadding: "0px 1.25rem",
    scrollbarWidth: "none",
  };
  return (
    <Box sx={style}>
      <CreateList />
      <div className="flex ml-5 gap-6 items-start">
        {list.map((el) => {
          return (
            <ListDetails
              id={el.id}
              title={el.title}
              key={el.id}
              cards={el.cards}
            />
          );
        })}
      </div>
    </Box>
  );
}

export default List;
