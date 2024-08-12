import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './Todos.css';
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Button,
  Stack,
  Chip,
  Divider,
  Typography
} from "@mui/material";
import Input from "../../components/Input/Input";
import DeleteIcon from '@mui/icons-material/Delete';

export type TodoItem = {
  id: string;
  text: string;
  selected: boolean;
}

function Todos() {
  const [list, setList] = useState<TodoItem[]>([]);
  const [showList, setShowList] = useState<TodoItem[]>([]);
  const [value, setValue] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [type, setType] = useState<string>("all");

  const selectedItems = useMemo(() => {
    return list.filter((el) => el.selected).map((item) => item.id);
  }, [list]);

  const leftElements = useMemo(() => list.length - selectedItems.length, [list, selectedItems]);

  useEffect(() => {
    if (list.length) {
      if (type === "all") {
        setShowList(list);
      } else if (type === "active") {
        setShowList(list.filter((item) => !selectedItems.includes(item.id)));
      } else if (type === "notActive") {
        setShowList(list.filter((item) => selectedItems.includes(item.id)));
      }
    }
  }, [type, list, selectedItems]);

  const handleDelete = useCallback(() => {
    setList((prev) => prev.filter((item) => !selectedItems.includes(item.id)))
  }, [setList, selectedItems]);

  const handleCheckboxChange = useCallback((id: string) => {
    setList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  }, [setList]);

  return (
    <div className="todosContainer">
      <div className="todos">
        <div className="inputRow">
          <Input
            value={value}
            setValue={setValue}
            setList={setList}
            list={list}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
        </div>
        <Collapse in={isExpanded}>
          <List sx={{ padding: '0' }}>
            {showList.map((el) => {
              const isSelected = selectedItems.includes(el.id)
              return(
                <ListItem key={el.id} sx={{ borderTop: '1px solid #919191', padding: '5px 0' }}>
                  <Checkbox
                    checked={isSelected || false}
                    onChange={() => handleCheckboxChange(el.id)}
                    value={isSelected || false}
                  />
                  <ListItemText
                    primary={el.text}
                    sx={{
                      textDecoration: isSelected ? 'line-through' : 'none',
                    }}
                  />
                </ListItem>
              )
            })}
          </List>
          <Stack spacing={2} direction="row" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #919191', p: '10px 5px' }}>
            <Typography>
              Осталось: {leftElements}
            </Typography>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Chip
              label="Все"
              variant={type === 'all' ? 'filled' : 'outlined'}
              color={type === 'all' ? 'primary' : 'default'}
              onClick={() => setType("all")}
            />
            <Chip
              label="Активные"
              variant={type === 'active' ? 'filled' : 'outlined'}
              color={type === 'active' ? 'primary' : 'default'}
              onClick={() => setType("active")}
            />
            <Chip
              label="Завершенные"
              variant={type === 'notActive' ? 'filled' : 'outlined'}
              color={type === 'notActive' ? 'primary' : 'default'}
              onClick={() => setType("notActive")}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDelete} disabled={!selectedItems.length}>
              Удалить
            </Button>
          </Stack>
        </Collapse>
      </div>
    </div>
  );
}

export default Todos;
