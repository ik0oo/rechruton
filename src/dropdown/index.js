import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


export const Dropdown = ({ names, onChange }) => {
  const onChangeData = (data) => onChange(data.currentTarget.innerHTML);

  return (
    <Autocomplete
      onChange={onChangeData}
      disablePortal
      id="combo-box-demo"
      options={names}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Jobs" />}
    />
  );
}