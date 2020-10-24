import { IconButton, Link, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState } from "react";

import { DeleteRecipe } from "../RecepieControl/RecepieControl";
import { AlertDialogState } from "../../models/AlertDialogState";
import AlertDialog from "../AlertDialog/AlertDialog";
import AcceptDialog from "../AlertDialog/AcceptDialog";

interface RecipeCardMenuProps {
  recipeId: string;
}

export default function RecipeCardMenu(props: RecipeCardMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [alertDialogState, setAlertDialogState] = useState<AlertDialogState>({
    open: false,
  });
  const [acceptDialogState, setAcceptDialogState] = useState<AlertDialogState>({
    open: false,
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link
            style={{ textDecoration: "none" }}
            href={`/editForm/${props.recipeId}`}
          >
            <EditIcon />
            Edit
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setAcceptDialogState({
              text: "Do you really want to delete this Recipe?",
              open: true,
            });
          }}
        >
          <DeleteIcon />
          Delete
        </MenuItem>
      </Menu>
      <AlertDialog
        alertDialogState={alertDialogState}
        onClose={() => {
          setAlertDialogState({ open: false });
          window.location.reload(false);
        }}
      />
      <AcceptDialog
        alertDialogState={acceptDialogState}
        onCancel={() => {
          setAcceptDialogState({ open: false });
        }}
        onOk={() => {
          setAcceptDialogState({ open: false });
          let resultParams = DeleteRecipe(props.recipeId);
          resultParams
            .then(() => {
              setAlertDialogState({ text: "Recipe deleted.", open: true });
            })
            .catch((error) => {
              const errorMessage = error as { message: string };
              let alertMessage =
                "An error has occurred: " + errorMessage?.message;
              setAlertDialogState({
                alertTitle: "Error",
                text: alertMessage,
                open: true,
              });
            });
        }}
      />
    </div>
  );
}
