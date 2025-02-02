import { Request, Response } from 'express';
import pool from '../config/database';
import { successResponse, errorResponse } from '../common/baseResponse';

const createCategory = async (req: Request, res: Response) => {
    try {
        const { categoryName, createdBy } = req.body;
        const result = await pool.query('INSERT INTO recipe.categories (categoryname, createdby) VALUES ($1, $2) RETURNING *', [categoryName, createdBy]);
        res.status(201).json(successResponse(result.rows[0], 'Category created successfully'));
    } catch (error) {
        res.status(500).json(errorResponse('Internal server error'));
    }
}

const getCategories = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM recipe.categories WHERE isactive = true');
        const data = {
            categories: result.rows,
            total: result.rowCount
        }
        res.status(200).json(successResponse(data, 'Categories retrieved successfully'));
    } catch (error) {
        res.status(500).json(errorResponse('Internal server error'));
    }

}

const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM recipe.categories WHERE id = $1 AND isactive = true', [id]);

        res.status(200).json(successResponse(result.rows, 'Category retrieved successfully'));
    } catch (error) {
        res.status(500).json(errorResponse('Internal server error'));
    }
}

const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { categoryName, isActive, updatedBy } = req.body;
        const result = await pool.query('UPDATE recipe.categories SET categoryname = $1, isactive = $2 updatedby = $3 WHERE id = $4 RETURNING *', [categoryName, isActive, updatedBy, id]);
        res.status(200).json(successResponse(result.rows, 'Category update successfully'));
    } catch (error) {
        res.status(500).json(errorResponse('Internal server error'));
    }
}

const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query('UPDATE recipe.categories SET isactive = false WHERE id = $1 RETURNING *', [id]);
        res.status(200).json(successResponse(result.rows, 'Category delete successfully'));
    } catch (error) {
        res.status(500).json(errorResponse('Internal server error'));
    }
}

export {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}

