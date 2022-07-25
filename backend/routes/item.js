import express from 'express';
import { get_items, search_items, insert_item, delete_item } from './../controller/item.js';

const router = express.Router();

router.get('/', get_items);
router.get('/search', search_items);
router.post('/create', insert_item);
router.post('/delete', delete_item);

export default router;
