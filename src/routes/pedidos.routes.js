import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/addp', (req,res)=>{
    res.render('pedidos/addp');
});

router.post('/addp', async(req, res)=>{
    try{
        const {id, fechapedido, total} = req.body;
        const newPedido = {
            id, fechapedido, total
        }
        await pool.query('INSERT INTO pedido SET ?', [newPedido]);
        res.redirect('/listp');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/listp', async(req, res)=>{
    try{
        const [result] = await pool.query('SELECT * FROM pedido');
        res.render('pedidos/listp', {pedidos: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/editp/:idp', async(req, res)=>{
    try{
        const {idp} = req.params;
        const [pedido] = await pool.query('SELECT * FROM pedido WHERE idp = ?', [idp]);
        const pedidoEdit = pedido[0];
        res.render('pedidos/editp', {pedido: pedidoEdit});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/editp/:idp', async(req, res)=>{
    try{
        const {id, fechapedido, total} = req.body;
        const {idp} = req.params;
        const editPedido = {id, fechapedido, total};
        await pool.query('UPDATE pedido SET ? WHERE idp = ?', [editPedido, idp]);
        res.redirect('/listp');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/deletep/:idp', async(req, res)=>{
    try{
        const {idp} = req.params;
        await pool.query('DELETE FROM pedido WHERE idp = ?', [idp]);
        res.redirect('/listp');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

export default router;




