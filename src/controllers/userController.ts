import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database';

const createUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const result = await pool.query('INSERT INTO users (id, username, passwordhash, email) VALUES ($1, $2, $3, $4) RETURNING *', [uuidv4(), username, password, email]);
  res.status(201).json(result.rows[0]);
}

const getUsers = async (req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM users');
  res.status(200).json(result.rows);
}

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  res.status(200).json(result.rows[0]);
}

const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { username, password, email } = req.body;
  const result = await pool.query('UPDATE users SET username = $1, passwordhash = $2, email = $3 WHERE id = $4 RETURNING *', [username, password, email, id]);
  res.status(200).json(result.rows[0]);
}


export default { 
  createUser,
  getUsers,
  getUserById,
  updateUser
};