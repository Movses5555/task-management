import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditList from "../edit";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { deleteListOperation } from "store/modules/list/operations";
import { useDispatch, useSelector } from "react-redux";
import CreateCard from "components/card/create";
import Card from "components/card";
import { Droppable, Draggable } from "react-beautiful-dnd";
function ListDetails(props) {
  const { title, id, cards, index } = props;
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.list.isDeleteFetching);
  const [isEditing, setIsEditing] = useState(false);
  const [addNewCardOpen, setAddNewCardOpen] = useState(false);
  const closeClickOutSide = (e) => {
    if (!e.target.closest(`.list-${id}`)) {
      setAddNewCardOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", closeClickOutSide);
    return () => {
      window.removeEventListener("click", closeClickOutSide);
    };
  });
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={id}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`rounded-b border max-h-content overflow-auto bg-slate-50 shadow-md list-details list-${id} w-80 flex justify-between p-3 flex-col`}
              >
                {isEditing ? (
                  <EditList
                    id={id}
                    saveEdit={() => setIsEditing(false)}
                    title={title}
                  />
                ) : (
                  <div className="flex justify-between sticky">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <div className="flex">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => setIsEditing(true)}
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                      {isFetching ? (
                        <LoadingButton
                          loading
                          loadingPosition="center"
                          startIcon={<SaveIcon />}
                          variant="text"
                          size="small"
                        />
                      ) : (
                        <IconButton
                          onClick={() => dispatch(deleteListOperation(id))}
                          color="error"
                          size="small"
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </div>
                  </div>
                )}
                <div className="cards overflow-y-auto flex-col flex flex-auto">
                  {cards.length > 0 &&
                    cards.map((el, index) => {
                      return (
                        <Card
                          index={index}
                          key={el.id}
                          id={el.id}
                          listId={id}
                          title={el.title}
                          desc={el.description}
                        />
                      );
                    })}
                </div>
                <div className="mt-4">
                  {addNewCardOpen ? (
                    <CreateCard
                      id={id}
                      onSave={() => setAddNewCardOpen(false)}
                    />
                  ) : (
                    <Button
                      startIcon={<AddSharpIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        setAddNewCardOpen(true);
                      }}
                      variant="text"
                      color="primary"
                    >
                      Add new card
                    </Button>
                  )}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default ListDetails;
