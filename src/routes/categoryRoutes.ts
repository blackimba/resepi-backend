import { Router } from "express";

import {
    createCategory,
    deleteCategory,
    getCategoryById,
    getCategories,
    updateCategory,
} from "../controllers/categoriesController";

const categoryRouter = Router();

categoryRouter.get('/', getCategories);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.post('/create', createCategory);
categoryRouter.put('/:id', updateCategory);
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter;