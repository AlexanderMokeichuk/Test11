import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Button, Grid, SelectChangeEvent, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import FileInput from "../../UI/components/FileInput/FileInput";
import {ProductFrom} from "../../type";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {selectCategories} from "../Categories/categoriesSlice";
import {fetchCategories} from "../Categories/categoriesThunks";
import {selectUser} from "../Users/usersSlice";
import {postProduct} from "./productsThunks";
import {selectBtnLauding} from "./productsSlice";

const defaultState: ProductFrom = {
  title: "",
  description: "",
  price: "",
  image: null,
};

const AddNewProduct: React.FC = () => {
  const navigate = useNavigate();
  const [category, setCategory] = React.useState<string[]>([]);
  const [formState, setFormState] = useState<ProductFrom>(defaultState);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const btnLauding = useAppSelector(selectBtnLauding);
  const user = useAppSelector(selectUser);


  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      dispatch(fetchCategories());
    }
  }, [dispatch, user, navigate]);

  const handleChange = (event: SelectChangeEvent<typeof category>) => {
    const {
      target: { value },
    } = event;
    setCategory(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    let number = 1;
    if (name === "price") {
      number = parseInt(value);
    }

    if (number > 0) {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setFormState(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(postProduct({
      ...formState,
      category: category[0],
    }));
    setCategory([""]);
    setFormState(defaultState);
  };

  return (
    <Grid container justifyContent={"center"}>
      <form onSubmit={onSubmit}>
        <Grid
          item
          sx={{
            width: 700,
            display: 'flex',
            flexDirection: "column",
            gap: 1,
          }}
        >
          <TextField
            id="input-with-sx"
            name={"title"}
            label="Title"
            required

            value={formState.title}
            onChange={onChangeForm}
          />

          <TextField
            id="input-with-sx"
            name={"price"}
            label="Price"
            type={"number"}
            required

            value={formState.price}
            onChange={onChangeForm}
          />


          <TextField
            id="outlined-multiline-flexible"
            name={"description"}
            required
            multiline
            fullWidth={true}
            minRows={2}
            maxRows={10}

            value={formState.description}
            onChange={onChangeForm}
          />

          <FileInput
            name={"image"}
            onChange={onChangeFileInput}
          />

          <div>
            <FormControl sx={{m: 1, width: "100%"}}>
              <InputLabel id="demo-multiple-name-label">Catagories</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={category}
                onChange={handleChange}
                input={<OutlinedInput label="Catagories"/>}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category._id}
                    value={category._id}
                  >
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <Button
            variant="contained"
            aria-label="Basic button group"
            type={"submit"}
            disabled={btnLauding}
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: "auto"
            }}
          >
            Send
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default AddNewProduct;