import React, { useEffect, useRef, useState } from "react";
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
import { requestsEnum } from "store/modules/requestsEnum";
import { namedRequestsInProgress } from "store/modules/request/selectors";
function ListDetails(props) {
  const { title, id, cards, index } = props;
  const dispatch = useDispatch();
  const isFetching = useSelector((state) =>
    namedRequestsInProgress(state, requestsEnum(id).deleteList)
  );
  const [isEditing, setIsEditing] = useState(false);
  const [addNewCardOpen, setAddNewCardOpen] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (componentRef && componentRef.current) {
        const ref = componentRef.current;
        if (
          !ref.contains(e.target) &&
          !e.target.classList.contains(`add-btn-${id}`)
        ) {
          setAddNewCardOpen(false);
        }
      }
    }
  }, []);
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded-b border max-h-screen relative bg-slate-50 shadow-md list-details list-${id} w-80 flex justify-between p-3 flex-col`}
          ref={provided.innerRef}
        >
          <div className="header sticky">
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
          </div>
          <Droppable droppableId={id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div className="cards min-h-4 max-h-50 overflow-y-auto flex-col flex flex-auto">
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

                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <div
            ref={componentRef}
            className={`${cards.length > 0 ? "mt-4" : ""}`}
          >
            {addNewCardOpen ? (
              <CreateCard id={id} onSave={() => setAddNewCardOpen(false)} />
            ) : (
              <Button
                className={`add-btn-${id}`}
                startIcon={<AddSharpIcon />}
                onClick={(e) => {
                  setAddNewCardOpen(true);
                }}
                variant="text"
                color="primary"
              >
                Add new card
              </Button>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default ListDetails;
