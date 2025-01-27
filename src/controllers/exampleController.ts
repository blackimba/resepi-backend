import { Request, Response } from 'express';
import pool from '../config/database';

const getExample = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM recipe.users');
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error: ' +err });
  }
}

export default { getExample };