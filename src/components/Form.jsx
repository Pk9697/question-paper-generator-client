import { TextField, Button, Slider, Typography } from '@mui/material'
import { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import PDFFile from './PDFFile'

function Form() {
  const [formData, setFormData] = useState({
    totalMarks: 100,
    easyPercentage: 20,
    mediumPercentage: 50,
    hardPercentage: 30,
  })
  const [generateQP, setGenerateQP] = useState(false)

  const { totalMarks, easyPercentage, mediumPercentage, hardPercentage } =
    formData

  const handleChange = (e) => {
    const { name, value } = e.target
    setGenerateQP(false)
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ formData })
    setGenerateQP(true)
  }

  const handleReset = () => {
    setFormData({
      totalMarks: 100,
      easyPercentage: 20,
      mediumPercentage: 50,
      hardPercentage: 30,
    })
    setGenerateQP(false)
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <h2>Question Paper Generator</h2>
      <TextField
        label="Total Marks"
        name="totalMarks"
        onChange={handleChange}
        required
        variant="outlined"
        color="secondary"
        type="number"
        sx={{ mb: 3 }}
        fullWidth
        value={totalMarks}
      />
      <Typography id="input-slider" gutterBottom>
        Easy %
      </Typography>
      <Slider
        aria-label="Easy Percentage"
        name="easyPercentage"
        value={easyPercentage}
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={5}
        marks
        min={0}
        max={100}
        sx={{ mb: 3 }}
      />
      <Typography id="input-slider" gutterBottom>
        Medium %
      </Typography>
      <Slider
        aria-label="Medium Percentage"
        name="mediumPercentage"
        value={mediumPercentage}
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={100}
        sx={{ mb: 3 }}
      />
      <Typography id="input-slider" gutterBottom>
        Hard %
      </Typography>
      <Slider
        aria-label="Hard Percentage"
        name="hardPercentage"
        value={hardPercentage}
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={15}
        marks
        min={0}
        max={100}
        sx={{ mb: 3 }}
      />
      <Button variant="outlined" color="secondary" type="submit" sx={{ mr: 3 }}>
        Generate Question Paper
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        type="button"
        sx={{ mr: 3 }}
        onClick={handleReset}
      >
        Reset
      </Button>
      {generateQP && (
        <PDFDownloadLink document={<PDFFile />} fileName="questionpaper">
          {({ loading }) =>
            loading ? (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
              >
                Loading...
              </LoadingButton>
            ) : (
              <LoadingButton
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
              >
                Save
              </LoadingButton>
            )
          }
        </PDFDownloadLink>
      )}
    </form>
  )
}

export default Form
