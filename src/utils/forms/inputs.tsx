
import { FilledInput, FormControl, Grid, Grid2, Input, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import { ICustomSelectProps, ICustomTextProps } from "../../interface/popup";
import { ReactNode, useState } from "react";
import React from "react";

export function SelectInputs(props: ICustomSelectProps) {
  const [fieldError, setFieldError] = useState(false);
  const errors: Set<string> = new Set<string>();
  const inputPropertyValue = () => {
    const variant = 'standard';
    if ((this.props.variant || variant) === 'outlined') {
      return (<OutlinedInput id={this.props.id} label={this.props.label} key={this.props.id} required={this.props.required} />);
    }
    if ((this.props.variant || variant) === 'filled') return <FilledInput id={this.props.id} key={this.props.id} required={this.props.required} />;
    if ((this.props.variant || variant) === 'standard') return <Input id={this.props.labelId} value={this.props.value} required={this.props.required} />;
  }
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFieldError(true);
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

    if (!event.target.value || (event.target.value && event.target.value.toString().trim() === '')) {
      this.errors.add(event.target.name);
    } else {
      this.errors.delete(event.target.name);
    }

    if (typeof this.props.errors === 'function') {
      this.props.errors([...this.errors]);
    }
  }
  const handleChange = (event: SelectChangeEvent<string>, child?: ReactNode) => {
    if (!event.target.value || (event.target.value && event.target.value.toString().trim() === '')) {
      event.target.name && this.errors.add(event.target.name);
    } else {
      event.target.name && this.errors.delete(event.target.name);
    }

    this.props.handleChange(event);
  }

  return (
    <>
      <FormControl style={{ width: '100%' }} required={props.required} key={props.id} error={props.error}>
        <InputLabel htmlFor={props.labelId} key={props.label}>{props.label}</InputLabel>
        <Select
          value={props.value}
          labelId={props.labelId}
          id={props.id}
          name={props.name}
          onChange={handleChange}
          input={inputPropertyValue()}
          label={props.label}
          key={props.id}
          onBlur={handleBlur}
          style={props.style}
          disabled={props.disabled}
        >
          <MenuItem style={{ whiteSpace: 'normal', maxWidth: '600px' }} key={`${props.label}`} value={undefined} selected>
            {'Select'}
          </MenuItem>
          {!props.defaultValue && props.options && props.options.length > 0 && props.options.map((o: { title: string, value: string }) => (
            <MenuItem
              style={{ whiteSpace: 'normal', maxWidth: '600px' }}
              key={`${o.value}`}
              value={o.value}
            >
              {o.title}
            </MenuItem>
          ))}
          {props.defaultValue &&
            <MenuItem
              style={{ whiteSpace: 'normal', maxWidth: '600px' }}
              key={`${props.defaultValue}`}
              value={props.defaultValue}
            >
              {props.defaultValue}
            </MenuItem>
          }
        </Select>
        {<p style={{ display: !props.value && props.required && props.onBlurError && fieldError ? 'block' : 'none', color: 'red', fontSize: '12px' }}>{'This field is required'}</p>}
      </FormControl>
    </>
  );
}


export function TextInputs(props: ICustomTextProps) {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{xs: 6}} offset={{xs: 2}}>
        <TextField
          label={props.label}
          id={props.id}
          name={props.name}
          helperText="0/4000"
          multiline
          required={props.required}
          fullWidth
          value={props.value}
          onChange={props.handleChange}
          variant={props.variant}
          disabled={props.disabled}
          error={props.error}
        />
      </Grid2>
    </Grid2 >
  )
}