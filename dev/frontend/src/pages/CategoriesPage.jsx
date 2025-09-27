import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [name, setName] = useState('');

  const fetchCategories = async () => {
    const res = await axios.get('/api/categories');
    setCategories(res.data.categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleClickOpen = (category = null) => {
    setSelectedCategory(category);
    setName(category ? category.name : '');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
    setName('');
  };

  const handleSave = async () => {
    if (selectedCategory) {
      await axios.put(`/api/categories/${selectedCategory.id}`, { name });
    } else {
      await axios.post('/api/categories', { name });
    }
    fetchCategories();
    handleClose();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await axios.delete(`/api/categories/${id}`);
      fetchCategories();
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={() => handleClickOpen()}>Add Category</Button>
      <List>
        {categories.map(category => (
          <ListItem key={category.id} secondaryAction={
            <>
              <IconButton edge="end" aria-label="edit" onClick={() => handleClickOpen(category)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(category.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedCategory ? 'Edit Category' : 'Add Category'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CategoriesPage;
