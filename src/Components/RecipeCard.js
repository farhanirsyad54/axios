import * as React from "react";
import { useRef, useState } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Modal, Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const RecipeCard = ({ card, doRefresh, changeHandle, setMakanan }) => {
  const classes = useStyles();
  console.log(card);
  const [openModal, setOpen] = useState(false);
  const openHandle = () => setOpen(true);
  const closeHandle = () => setOpen(false);

  const deletHandle = () => {
    axios.delete("http://localhost:1234/recipes/" + card.id);
    doRefresh();
  };
  const handleOpen = () => {
    setMakanan({
      tittle: card.tittle,
      content: card.content,
      image: card.image,
    });
  };

  const editHandle = (e) => {
    const makanans = { tittle: card.tittle, content: card.content, image: card.image };
    axios.put("http://localhost:1234/recipes/" + card.id, makanans);
    doRefresh();
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal open={openModal} onClose={closeHandle} aria-labelledby="modal-modal-edit" aria-describedby="modal-modal-edit">
        <Box sx={style}>
          <Typography variant="h5" align="left" color="textPrimary" marginBottom="15px" gutterBottom>
            Edit Recipe
          </Typography>
          <Box sx={{ width: 400, maxWidth: "100%" }}>
            <FormControl>
              <InputLabel htmlFor="component-outlined">Tittle</InputLabel>
              <OutlinedInput id="component-outlined" name="tittle" value={card.tittle} onChange={changeHandle} label="tittle" />
            </FormControl>
          </Box>
          <Box component="form" sx={{ "& > :not(style)": { m: 0, width: "25ch", marginTop: 2, marginBottom: 2 } }} noValidate autoComplete="off">
            <TextField id="outlined-multiline-static" name="content" label="Content" multiline rows={3} value={card.content} onChange={changeHandle} />
          </Box>
          <Box sx={{ width: 400, maxWidth: "100%", marginBottom: 2 }}>
            <FormControl>
              <InputLabel htmlFor="component-outlined">Image URL</InputLabel>
              <OutlinedInput id="component-outlined" value={card.image} onChange={changeHandle} name="image" label="image" />
            </FormControl>
          </Box>
          <Button variant="contained" onClick={editHandle}>
            Update
          </Button>
        </Box>
      </Modal>
      <Grid item key={card.id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia className={classes.cardMedia} image={card.image} title={card.tittle} />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {card.tittle}
            </Typography>
            <Typography>{card.content}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={deletHandle}>
              Delet
            </Button>
            <Button size="small" onClick={openHandle}>
              Edit
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};
export default RecipeCard;
