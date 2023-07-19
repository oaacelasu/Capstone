import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import TopBar from "./TopBar";
import NavHeader from "./NavHeader";
import axios from "axios";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFormSubmit = async (values) => {
    try {
        const response = await axios.post("http://localhost:3001/topic", values);
        console.log("Topic created:", response.data);

        // Clear form values
        setSelectedImage(null);
      } catch (error) {
        console.error("Error creating topic:", error);
      }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const initialValues = {
    topicname: "",
    topicdescription: "",
  };

  const checkoutSchema = yup.object().shape({
    topicname: yup.string().required("Topic name is required"),
    topicdescription: yup.string().required("Topic description is required"),
  });

  return (
    <Box m="20px" backgroundColor='white'>
        <NavHeader />
        <TopBar />
        <Box
            style={{ padding: '20px', textAlign: 'center' }}
            marginBottom="20px"
        >
            <h2>CREATE TOPIC</h2>
        <label htmlFor="image-upload">
          <Avatar
            src={selectedImage || "/path/to/default-profile-image.png"}
            alt="User Profile"
            sx={{ width: 100, height: 100, marginTop: 10, cursor: "pointer" }}
          />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </label>
      </Box>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Topic Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.topicname}
                name="topicname"
                error={!!touched.topicname && !!errors.topicname}
                helperText={touched.topicname && errors.topicname}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Topic Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.topicdescription}
                name="topicdescription"
                error={!!touched.topicdescription && !!errors.topicdescription}
                helperText={touched.topicdescription && errors.topicdescription}
                sx={{ gridColumn: "span 4" }}
              />
              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Topic
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});

export default Form;
