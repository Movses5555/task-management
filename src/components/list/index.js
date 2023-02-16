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
  return (
    <div className="flex">
      <CreateList />
      <div className="flex ml-5 gap-6">
        {list.map((el) => {
          return (
            <ListDetails
              setList={setList}
              id={el.id}
              title={el.title}
              key={el.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default List;
