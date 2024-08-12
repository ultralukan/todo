import React, {useCallback} from 'react';
import './Input.css';
import {Divider, IconButton, InputBase, Paper} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DirectionsIcon from '@mui/icons-material/Directions';
import classNames from "classnames";
import {TodoItem} from "../../containers/Todos/Todos";

type InputProps = {
  setList: (value: (prev: TodoItem[]) => TodoItem[]) => void;
  setValue: (value: string) => void;
  value: string;
  list: TodoItem[];
  isExpanded: boolean;
  setIsExpanded: (value: boolean | ((prev: boolean) => boolean)) => void;
}

function Input({ setList, setValue, value, isExpanded, setIsExpanded, list }: InputProps) {

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, [setValue]);

  const handleEnter = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const generateId = () => '_' + Math.random().toString(36).substr(2, 9);
      setList((prev) => [...prev, { id: generateId(), text: value, selected: false }]);
      setValue("");
      setIsExpanded(true);
    }
  }, [setList, value, setIsExpanded, setValue]);

  const handleSubmit = useCallback(() => {
    const generateId = () => '_' + Math.random().toString(36).substr(2, 9);
    setList((prev) => [...prev, { id: generateId(), text: value, selected: false }]);
    setValue("");
    setIsExpanded(true);
  }, [setList, value, setIsExpanded, setValue]);

  const handleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, [setIsExpanded]);

  const expandClass = classNames({
    'expand': true,
    'expand-pressed': isExpanded,
  });

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 700, boxShadow: 'none' }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleExpand} disabled={!list.length}>
        <ExpandMoreIcon className={expandClass} />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, p: '5px' }}
        placeholder="Добавьте задачу"
        inputProps={{ 'aria-label': 'Добавьте задачу' }}
        onChange={handleChange}
        onKeyDown={handleEnter}
        value={value}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="submit" onClick={handleSubmit}>
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}

export default Input;
