import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/add', (req,res)=>{
    res.render('clientes/add');
});

router.post('/add', async(req, res)=>{
    try{
        const {nomcli, apecli, nrodnicli,telcli} = req.body;
        const newCliente = {
            nomcli, apecli, nrodnicli,telcli
        }
        await pool.query('INSERT INTO cliente SET ?', [newCliente]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/list', async(req, res)=>{
    try{
        const [result] = await pool.query('SELECT * FROM cliente');
        res.render('clientes/list', {clientes: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/edit/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const [cliente] = await pool.query('SELECT * FROM cliente WHERE id = ?', [id]);
        const clienteEdit = cliente[0];
        res.render('clientes/edit', {cliente: clienteEdit});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/edit/:id', async(req, res)=>{
    try{
        const {nomcli, apecli, nrodnicli,telcli} = req.body;
        const {id} = req.params;
        const editCliente = {nomcli, apecli, nrodnicli,telcli};
        await pool.query('UPDATE cliente SET ? WHERE id = ?', [editCliente, id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/delete/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        await pool.query('DELETE FROM cliente WHERE id = ?', [id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});
export default router;






