"use client"

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';


const ProSpan = styled('span')({
  display: 'inline-block',
  height: '1em',
  width: '1em',
  verticalAlign: 'middle',
  marginLeft: '0.3em',
  marginBottom: '0.08em',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

function Label({ componentName, valueType, isProOnly }) {
  const content = (
    <span>
      <strong>{componentName}</strong> for {valueType} editing
    </span>
  );

  if (isProOnly) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included on Pro package">
          <a
            href="https://mui.com/x/introduction/licensing/#pro-plan"
            aria-label="Included on Pro package"
          >
            <ProSpan />
          </a>
        </Tooltip>
        {content}
      </Stack>
    );
  }

  return content;
}

const handleDateChange = (e) => {
  console.log("e.target.value")
  console.log((new Date(e.$d)).toISOString())
}

const mifecha = new Date()

export default function CommonlyUsedComponents() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
     
        <DemoItem label={<Label componentName="DatePicker" valueType="date" />}>
          <DatePicker format="DD/MM/YYYY" />
        </DemoItem>
        <DemoItem label={<Label componentName="TimePicker" valueType="time" />}>
          <TimePicker />
        </DemoItem>
        <DemoItem
          label={<Label componentName="DateTimePicker" valueType="date time" />}
        >
          <DateTimePicker  
            label="DateTimePicker"
            inputVariant="outlined"

            onChange={handleDateChange}
            format="DD/MM/YYYY hh:mm a"
          />
        </DemoItem>
        <div>
        <DateTimePicker  
            label="DateTimePicker"
            inputVariant="outlined"
            value={dayjs(mifecha)}
            onChange={handleDateChange}
            format="DD/MM/YYYY hh:mm a"
          />
        </div>
        


    </LocalizationProvider>
  );
}