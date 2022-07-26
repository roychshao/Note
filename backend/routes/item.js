import express from 'express';
import auth from './../middleware/auth.js';
import { get_items, search_items, insert_item, delete_item } from './../controller/item.js';

const router = express.Router();

router.get('/', /*auth,*/ get_items);
router.get('/search', /*auth,*/ search_items);
router.post('/create', /*auth,*/ insert_item);
router.post('/delete', /*auth,*/ delete_item);

export default router;
