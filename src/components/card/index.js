import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteCardOperation } from "store/modules/list/operations";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { Modal } from "@mui/material";
import CardEdit from "./edit";
function Card(props) {
  const { id, title, listId, desc } = props;
  const dispatch = useDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);
  const isDeleteFetching = useSelector(
    (state) => state.list.isCardDeleteFetching
  );

  return (
    <>
      <div
        className={`w-full p-3 bg-white mt-4 shadow-md rounded-lg card-${id}`}
      >
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="truncate">{desc}</p>
        <div className="w-full flex justify-end">
          <IconButton
            color="primary"
            size="small"
            onClick={() => setOpenEditModal(true)}
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
          {isDeleteFetching ? (
            <LoadingButton
              loading
              loadingPosition="center"
              startIcon={<SaveIcon />}
              variant="text"
              color="primary"
            />
          ) : (
            <IconButton
              onClick={() => {
                dispatch(deleteCardOperation({ id, listId }));
              }}
              color="error"
              size="small"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      </div>
      {openEditModal && (
        <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
          <CardEdit
            closeModal={() => setOpenEditModal(false)}
            title={title}
            listId={listId}
            id={id}
            desc={desc}
          />
        </Modal>
      )}
    </>
  );
}

export default Card;
