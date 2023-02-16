import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Card(props) {
  const { id, title, desc } = props;
  const [openEditModal, setOpenEditModal] = useState(false);
  return (
    <div className={`w-full p-3 bg-white mt-4 shadow-md rounded-lg card-${id}`}>
      <h3 className="font-bold text-lg">{title}</h3>
      <p>{desc}</p>
      <div className="w-full flex justify-end">
        <IconButton
          color="primary"
          size="small"
          onClick={() => setOpenEditModal(true)}
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => {}}
          color="error"
          size="small"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Card;
