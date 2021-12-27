import * as React from "react";
import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import useStyles from "./Style";
import { Button, Container, CssBaseline, Grid, Typography } from "@mui/material";
import { Modal, Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from "axios";

export default function Recipes() {
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [openModal, setOpen] = useState(false);

  const makanan = {
    tittle: "",
    content: "",
    image: "",
  };

  const [{ tittle, content, image }, setMakanan] = useState(makanan);

  const changeHandle = (e) => {
    let dataMakanan = { ...makanan };
    dataMakanan[e.target.name] = e.target.value;
    setMakanan(dataMakanan);
  };

  const addHandle = async () => {
    const recipePost = { tittle, content, image };
    const res = await axios.post("http://localhost:1234/recipes", recipePost);
    setMakanan({
      tittle: "",
      content: "",
      image: "",
    });
    setRefresh(!refresh);
    setOpen(false);
  };

  //deps = [] -- dijalankan hanya sekali
  useEffect(() => {
    console.log("useEffect");
    axios.get("http://localhost:1234/recipes").then((res) => {
      setCards(res.data);
    });
  }, [refresh]);

  const doRefresh = () => {
    console.log("doRefresh");
    setRefresh(!refresh);
  };

  const refreshHandle = () => {
    setRefresh(!refresh);
  };

  const openHandle = () => setOpen(true);
  const closeHandle = () => setOpen(true);

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
    <React.Fragment>
      <CssBaseline />

      <Modal open={openModal} onClose={closeHandle} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography variant="h5" align="left" color="textPrimary" marginBottom="15px" gutterBottom>
            Add Recipe
          </Typography>

          <Box sx={{ width: 400, maxWidth: "100%" }}>
            <FormControl>
              <InputLabel htmlFor="component-outlined">Tittle</InputLabel>
              <OutlinedInput id="component-outlined" value={tittle} onChange={changeHandle} name="tittle" label="image" />
            </FormControl>
          </Box>
          <Box component="form" sx={{ "& > :not(style)": { m: 0, width: "25ch", marginTop: 2, marginBottom: 2 } }} noValidate autoComplete="off">
            <TextField id="outlined-multiline-static" label="content" name="content" multiline rows={3} value={content} onChange={changeHandle} />
          </Box>
          <Box sx={{ width: 400, maxWidth: "100%", marginBottom: 2 }}>
            <FormControl>
              <InputLabel htmlFor="component-outlined">Image URL</InputLabel>
              <OutlinedInput id="component-outlined" value={image} onChange={changeHandle} name="image" label="image" />
            </FormControl>
          </Box>

          <Button variant="contained" type="submit" onClick={addHandle}>
            Add
          </Button>
        </Box>
      </Modal>

      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Recipes
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Aneka macam ide resep masakan dan makanan yang simpel tersaji disini untuk memberi panduan dan mempermudah dalam menentukan hidangan lezat untuk keluarga anda
            </Typography>
            <div className={classes.heroButtons}></div>
          </Container>
          <div className={classes.heroContent}>
            <Container>
              <Button onClick={doRefresh}>Refresh</Button>
              <Button onClick={openHandle}>Add New</Button>
            </Container>
          </div>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <RecipeCard key={card.id} card={card} doRefresh={doRefresh} changeHandle={changeHandle} makanan={makanan} />
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
