import {
  Checkbox,
  Typography,
  Grid,
  Select,
  MenuItem,
  Button,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [startDate, setStartDate] = useState(new Date());
  const [files, setFiles] = useState([{ name: "", type: "", file: null }]);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street1: "",
    street2: "",
    permStreet1: "",
    permStreet2: "",
  });

  const handleFileChange = (event, index) => {
    const selectedFile = event.target.files[0];
    const newFiles = [...files];
    newFiles[index].file = selectedFile;
    setFiles(newFiles);
  };

  const handleFileInputChange = (event, index) => {
    const { name, value } = event.target;
    const newFiles = [...files];
    newFiles[index][name] = value;
    setFiles(newFiles);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsSameAddress(isChecked);
    if (isChecked) {
      setFormData((prevState) => ({
        ...prevState,
        permStreet1: prevState.street1,
        permStreet2: prevState.street2,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        permStreet1: "",
        permStreet2: "",
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("dateOfBirth", startDate);
    data.append("street1", formData.street1);
    data.append("street2", formData.street2);
    data.append("permStreet1", formData.permStreet1);
    data.append("permStreet2", formData.permStreet2);
    files.forEach((fileObj, index) => {
      if (fileObj.file) {
        console.log(fileObj);
        data.append(`file${index}`, fileObj.file);
        data.append(`fileName${index}`, fileObj.name);
        data.append(`fileType${index}`, fileObj.type);
      }
    });

    console.log("sdsdsdsdsdsdsd", files);
    try {
      await axios.post("https://candidate-form-1-4gi7.onrender.com/api/submit-form", data);
      toast.success("Form submitted successfully!");
      // Reset form fields
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      street1: "",
      street2: "",
      permStreet1: "",
      permStreet2: "",
    });
    setStartDate(new Date());
    setFiles([{ name: "", type: "", file: null }]);
    setIsSameAddress(false); // Reset checkbox
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      toast.error("There was an error submitting the form!");
    }
  };

  const handleAddFileField = () => {
    setFiles([...files, { name: "", type: "", file: null }]);
  };

  const handleRemoveFileField = (index) => {
    if (files.length > 1) {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ margin: "0 200px" }}>
        <Typography variant="h4" mb={2}>
          Candidate Detail Form
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="email"
              label="E-mail"
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              customInput={
                <TextField
                  label="Date of Birth"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    style: { width: "620px" },
                  }}
                />
              }
            />
          </Grid>
        </Grid>

        <Typography variant="h5" sx={{ mt: 2 }}>
          Residential Address
        </Typography>
        <Grid container spacing={4} sx={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="street1"
              label="Street 1"
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="street2"
              label="Street 2"
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
          <Checkbox
            {...label}
            checked={isSameAddress}
            onChange={handleCheckboxChange}
          />
          <Typography
            variant="body1"
            component="span"
            sx={{ fontSize: "20px" }}
          >
            Same as Residential Address
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ mt: 2 }}>
          Permanent Address
        </Typography>
        <Grid container spacing={4} sx={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="permStreet1"
              label="Street 1"
              variant="outlined"
              fullWidth
              value={formData.permStreet1}
              onChange={handleInputChange}
              disabled={isSameAddress}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="permStreet2"
              label="Street 2"
              variant="outlined"
              fullWidth
              value={formData.permStreet2}
              onChange={handleInputChange}
              disabled={isSameAddress}
            />
          </Grid>
        </Grid>

        <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
          Upload Document
        </Typography>
        {files.map((fileObj, index) => (
          <Box
            sx={{ display: "flex", gap: "20px", mb: 2, alignItems: "center" }}
            key={index}
          >
            <TextField
              required
              name="name"
              label="File Name"
              variant="outlined"
              sx={{ width: "350px" }}
              value={fileObj.name}
              onChange={(e) => handleFileInputChange(e, index)}
            />
            <FormControl variant="outlined" sx={{ width: "350px" }}>
              <InputLabel id={`fileType-label-${index}`}>File Type</InputLabel>
              <Select
                labelId={`fileType-label-${index}`}
                name="type"
                value={fileObj.type}
                onChange={(e) => handleFileInputChange(e, index)}
              >
                <MenuItem value="jpg">jpg</MenuItem>
                <MenuItem value="jpeg">jpeg</MenuItem>
                <MenuItem value="png">png</MenuItem>
                <MenuItem value="pdf">pdf</MenuItem>
                <MenuItem value="docx">docx</MenuItem>
                <MenuItem value="xlsx">xlsx</MenuItem>
                <MenuItem value="pptx">pptx</MenuItem>
              </Select>
            </FormControl>
            <input
              accept=".pdf,.docx,.xlsx,.pptx"
              style={{ display: "none" }}
              id={`upload-file-${index}`}
              type="file"
              onChange={(e) => handleFileChange(e, index)}
            />
            <label htmlFor={`upload-file-${index}`}>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  backgroundColor: "#1976d2",
                  color: "white",
                  padding: "14px 16px",
                  cursor: "pointer",
                  borderRadius: "4px",
                  textAlign: "center",
                  width: "350px",
                }}
              >
                {fileObj.file ? fileObj.file.name : "Upload File"}
              </Box>
            </label>
            <IconButton
              color="primary"
              aria-label="Add new file"
              component="span"
              onClick={handleAddFileField}
              sx={{
                display: "inline-flex",
                width: "50px",
                height: "50px",
                border: "2px solid black",
                borderRadius: "4px",
              }}
            >
              +
            </IconButton>
            {files.length > 1 && (
              <IconButton
                color="secondary"
                aria-label="Remove file"
                component="span"
                onClick={() => handleRemoveFileField(index)}
                sx={{
                  display: "inline-flex",
                  width: "50px",
                  height: "50px",
                  border: "2px solid black",
                  borderRadius: "4px",
                }}
              >
                -
              </IconButton>
            )}
          </Box>
        ))}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            marginTop: "5px",
            padding: "10px 35px",
            backgroundColor: "#1565C0",
            "&:hover": {
              backgroundColor: "#0D47A1",
            },
          }}
        >
          Submit
        </Button>
      </Box>
      <ToastContainer />
    </>
  );
}

export default App;
