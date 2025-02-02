import { Request, Response } from 'express';
import pool from '../config/database';
import { User } from '../model/user';
import { successResponse, errorResponse } from '../common/baseResponse';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *         - isActive
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         isActive:
 *           type: boolean
 *           description: Indicates if the user is active
 *       example:
 *         id: d5fE_asz
 *         username: johndoe
 *         password: secret
 *         email: johndoe@example.com
 *         isActive: true
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    const result = await pool.query('INSERT INTO recipe.users ( username, passwordhash, email) VALUES ($1, $2, $3) RETURNING *', [username, password, email]);
    res.status(201).json(successResponse(result.rows, 'User created successfully'));
  } catch (error) {
    res.status(500).json(errorResponse('Internal server error'));
  }
}

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM recipe.users WHERE isactive = true');
    res.status(200).json(successResponse(result.rows, 'User retrieve successfully'));
  } catch (error) {
    res.status(500).json(errorResponse('Internal server error'));
  }
}

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const result = await pool.query('SELECT * FROM recipe.users WHERE id = $1 AND isactive = true', [id]);
    if (result.rows.length === 0) {
      res.status(404).json(errorResponse('Invalid Id', 'User not found'));
      return;
    }
    res.status(200).json(successResponse(result.rows, 'User retrieve successfully'));
  } catch (error) {
    res.status(500).json(errorResponse('Internal server error'));
  }
};

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update the user by the id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some server error
 */
const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { username, password, email, isActive } = req.body;
    const updateUser: User = { id, username, password, email, isActive };
    const result = await pool.query('UPDATE recipe.users SET username = $1, passwordhash = $2, email = $3, isactive = $4 WHERE id = $5 RETURNING *', [updateUser.username, updateUser.password, updateUser.email, updateUser.isActive, updateUser.id]);
    if (result.rowCount === 0) {
      res.status(404).json(errorResponse('Internal server error', 'User not found'));
      return;
    }
    res.status(200).json(successResponse(result.rows, 'User updated successfully'));
  } catch (error) {
    res.status(500).json(errorResponse('Internal server error'));
  }
}

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params;
    const result = await pool.query('UPDATE recipe.users SET isactive = false WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      res.status(404).json(errorResponse('Internal server', 'User not found'));
      return;
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json(errorResponse('Internal server'));
  }
}

export {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};