
//UserForm is our functional component 
import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
  Stack,
  Alert,
} from "@mui/material"

import MuiLink from "@mui/material/Link"
//import { Link } from "react-router-dom"

const validationSchema = yup.object({
  username: yup
    .string("Ingrese su nombre de usuario")
    .required("El nombre de usuario es requerido"),
})

export const UserForm = ({ onSubmit, loading, error }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  })

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
          >
            Login
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Nombre de usuario"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            {Boolean(error) && <Alert severity="error">{error}</Alert>}

          </Stack>
        </CardContent>
{/*         <CardActions sx={{ padding: 1 }}>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Box textAlign="center">
                <Button type="submit" variant="contained" disabled={loading}>
                  Iniciar Sesión
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardActions> */}
      </form>
    </Box>
  )
}
export default UserForm; // Export UserForm as the default export
