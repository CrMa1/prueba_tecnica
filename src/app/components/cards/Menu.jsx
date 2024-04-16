import React from 'react'
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";

const Menu = ({refreshData, sortTable, setFilterValue}) => {
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={() => refreshData()}>
              Refresh Data
            </Button>
            <Button variant="contained" onClick={() => sortTable()}>
              Sort Banks
            </Button>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="input-search">Search Bank</InputLabel>
              <OutlinedInput
                id="input-search"
                type="text"
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                }
                label="Search Bank"
                onChange={e => setFilterValue(e.target.value)}
              />
            </FormControl>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

export default Menu