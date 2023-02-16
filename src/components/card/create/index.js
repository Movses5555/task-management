import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import { FormControl, TextField } from "@mui/material";
import { checkAlphaNumericNotEmpty } from "helpers/alphanumericCheck";
import { useDispatch, useSelector } from "react-redux";
import { createNewCardOperation } from "store/modules/list/operations";
import { requestsEnum } from "store/modules/requestsEnum";
import { namedRequestsInProgress } from "store/modules/request/selectors";
function CreateCard(props) {
  const { id, onSave } = props;
  const dispatch = useDispatch();
  const isFetching = useSelector((state) =>
    namedRequestsInProgress(state, requestsEnum().createCard)
  );
  console.log(isFetching);
  const [cardName, setCardName] = useState("");
  const [cardDesc, setCardDesc] = useState("");
  const [errors, setErrors] = useState({
    nameError: "",
    descError: "",
  });
  const checkValid = async () => {
    let checkName = checkAlphaNumericNotEmpty(cardName);
    let checkDesc = checkAlphaNumericNotEmpty(cardDesc);
    if (checkName || checkDesc) {
      return setErrors({
        ...errors,
        nameError: checkName,
        descError: checkDesc,
      });
    }
    let saveData = {
      title: cardName,
      description: cardDesc,
      id,
    };
    await dispatch(createNewCardOperation(saveData));
    onSave();
    setCardName("");
    setCardDesc("");
  };
  return (
    <div className="flex flex-col">
      <div className="p-3">
        <FormControl>
          <TextField
            label="Name"
            variant="standard"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Enter list name"
            type="text"
            onFocus={() => setErrors({ ...errors, nameError: null })}
            error={!!errors.nameError}
            helperText={errors.nameError}
          />

          <TextField
            margin="dense"
            label="Description"
            multiline
            maxRows={4}
            value={cardDesc}
            onChange={(e) => setCardDesc(e.target.value)}
            variant="standard"
            onFocus={() => setErrors({ ...errors, descError: null })}
            error={!!errors.descError}
            helperText={errors.descError}
          />
          <div className="mt-4">
            {isFetching ? (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
                color="primary"
              >
                Saving
              </LoadingButton>
            ) : (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  checkValid();
                  
                }}
                variant="contained"
                color="primary"
              >
                Create
              </Button>
            )}
          </div>
        </FormControl>
      </div>
    </div>
  );
}

export default CreateCard;
