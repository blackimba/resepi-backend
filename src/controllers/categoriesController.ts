import { Request, Response } from 'express';
import pool from '../config/database';
import { successResponse, errorResponse } from '../common/baseResponse';

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *       example:
 *         id: d5fE_asz
 *         name: Desserts
 */

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: The categories managing API
 */

/**
 * @swagger
 * /api/category/create:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: The category was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Some server error
 */
const createCategory = async (req: Request, res: Response) => {
    try {
        const { categoryName, createdBy } = req.body;
        const result = await pool.query('INSERT INTO recipe.categories (categoryname, createdby) VALUES ($1, $2) RETURNING *', [categoryName, createdBy]);
        res.status(201).json(successResponse(result.rows, 'Category created successfully'));
    } catch (error) {
        res.status(500).json(errorResponse('Internal server error'));
    }
}

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Returns the list of all the categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: The list of the categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
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

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get the category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     responses:
 *       200:
 *         description: The category description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: The category was not found
 */
const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM recipe.categories WHERE id = $1 AND isactive = true', [id]);

        res.status(200).json(successResponse(result.rows, 'Category retrieved successfully'));
    } catch (error) {
        res.status(500).json(errorResponse('Internal server error'));
    }
}

/**
 * @swagger
 * /api/category/{id}:
 *   put:
 *     summary: Update the category by the id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The category was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: The category was not found
 *       500:
 *         description: Some server error
 */
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


/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Remove the category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     responses:
 *       200:
 *         description: The category was deleted
 *       404:
 *         description: The category was not found
 */
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

