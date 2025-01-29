import { Request, Response } from 'express';
import pool from '../config/database';

const createCategory = async (req: Request, res: Response) => {
    const { categoryName, createdBy } = req.body;
    const result = await pool.query('INSERT INTO recipe.categories (categoryname, createdby) VALUES ($1, $2) RETURNING *', [categoryName, createdBy]);
    res.status(201).json(result.rows[0]);
}

const getCategories = async (req: Request, res: Response) => {
    const result = await pool.query('SELECT * FROM recipe.categories WHERE isactive = true');
    res.status(200).json(result.rows);
}

const getCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM recipe.categories WHERE id = $1 AND isactive = true', [id]);
    res.status(200).json(result.rows[0]);
}

const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { categoryName, isActive, updatedBy } = req.body;
    const result = await pool.query('UPDATE recipe.categories SET categoryname = $1, isactive = $2 updatedby = $3 WHERE id = $4 RETURNING *', [categoryName, isActive , updatedBy, id]);
    res.status(200).json(result.rows[0]);
}

const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await pool.query('UPDATE recipe.categories SET isactive = false WHERE id = $1 RETURNING *', [id]);
    res.status(200).json(result.rows[0]);
}

export {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}

