import { Router } from 'express';
import * as userController from './controllers/userController';
import { authenticateToken } from './utils/authenticateToken';

const router = Router()

router.post('/user', userController.createUser);
router.post('/login', userController.login)


router.get('/teste', authenticateToken, (req, res) => {
    return res.json({
        messages: ['desviei 1 milhao', 'roubei 200 da minha sogra']
    })
})

export default router