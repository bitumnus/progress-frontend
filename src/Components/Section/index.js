import React from "react";
import Checkbox from "@mui/material/Checkbox";
// import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Section({section, index, handleChange, checkedList}) {
    return (
        <>
            <Divider>
                <Stack direction="row" spacing={1}>
                    <Chip label={index + 1} />
                    <Typography variant="button" display="block" gutterBottom>
                        {section.name}
                    </Typography>
                </Stack>
            </Divider>
            <FormGroup>
                {section.options.map((option, ind) => (
                    <FormControlLabel key={ind}
                                      checked={checkedList.options[ind]}
                                      disabled={!checkedList.disabled}
                                      control={<Checkbox onChange={(index) => handleChange(index)} />}
                                      value={`${index}_${ind}`}
                                      label={option.name}
                    />
                ))}
            </FormGroup>
        </>
    )
}


