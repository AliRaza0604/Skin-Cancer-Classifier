import { NextPage } from "next"
import { useState } from "react"
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from 'next/head';



let instance = axios.create({
  baseURL: "http://127.0.0.1:5000/api/",
  headers: {
      post: {
          "Content-Type": "application/json",
      },
  },
});


const index = () => {

  const [text, setText] = useState("");
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [disable, setDisable] = useState(false);



  async function handleImageUpload(image :File) {


    try {
        setDisable(true);
        setText("Predicting results ...");
        const formData = new FormData();
        formData.append('image', image);  // add the image to the form data

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'  // set the content type to 'multipart/form-data'
          }
        };

        let res = await instance.post('submit', formData, config);
        
        console.log(res.data);
        {
          (res.data.predicted_Class == 0) ? 
            setText("Congratulations You are Safe, Your Cancer is Benign") : setText("I am very sorry but Your Cancer is Malignant")
        }
        
    } catch (e) {
        console.log(e);
    }

    setDisable(false);

  }

  const onChange = e => {
    setImage(e.target.files[0])
  }

  const onSubmit = async e => {
    e.preventDefault()
    
    handleImageUpload(image)
  }


  return (
    // <form onSubmit={onSubmit} >
    //   <input type="file" onChange={onChange} accept = "image/*"/>
    //   <button type="submit">Upload</button>
    //   {imageUrl && <img src={imageUrl} alt="uploaded image" />}
    // </form>


    <div>
      <Head>
        <title>Clazifier</title>
      </Head>     
      <Box
        sx={{
            width: "100vw",
            height: "92px",
            backgroundColor: "#fff",
            boxShadow: "0 0 8px #555",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            zIndex: 100,
        }}
      >

          <Box sx={{ width: "80vw" }}>
              <Typography
                  color="primary"
                  fontSize="24px"
                  fontWeight={"bold"}
              >
                  Skin Cancer Image Classifier
              </Typography>
          </Box>
      </Box>

      <Box
          sx={{
              width: "100vw",
              height: "100vh",
              paddingTop: "122px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "22px",
          }}
      >
          <Box
              sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "22px",
              }}
          >
            <form onSubmit={onSubmit}>
              <Box
                  sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "22px",
                  }}
              >
                
                  <TextField
                      type="file"
                      accept = "image/*"
                      onChange={onChange}
                      label = "Select Image" 
                      // InputProps={{
                      //   style: { display: 'none' },
                      // }}  
                      InputLabelProps={{
                        shrink: true,
                      }}   
                      fullWidth   
                  />
                  
                  <Button
                      variant="contained"
                      size="large"
                      type="submit"
                      // onClick={handle}
                      disabled={disable}
                  >
                      Classify
                  </Button>

                  {imageUrl && <img src={imageUrl} alt="uploaded image" />}
                
              </Box>
            </form>
              <Box sx={{ width: "80vw" }}>
                  <TextField
                      label="Result"
                      multiline
                      rows={4}
                      fullWidth
                      inputProps={{
                          style: {
                              fontSize: "30px",
                              lineHeight: "52px",
                              
                          },
                      }}

                      
                      value={text}
                  />
              </Box>
          </Box>
        </Box>
    </div>

  )
  
}

export default index
