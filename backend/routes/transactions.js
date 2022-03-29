const express = require("express")
const transaction = require("../models/transaction")
const router = express.Router()
const Transaction = require("../models/transaction")

// Get all transaction
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find()
        res.json(transactions)
    } catch(err) {
        res.status(500).json({ 
            message: err.message 
        })
    }
})

// Get one transaction
router.get('/:id', (req, res) => {
    //To do: return one specific transaction
    res.json(res.transaction)
})

// Create transaction
router.post('/', async(req, res) => {
    const transaction = new Transaction({
        //To do: generate userId
        transId: "1",
    })
    try {
        const newTransaction = await transaction.save()
        res.status(201).json(newTransaction)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// Update transaction
router.patch('/:id', (req, res) => {
    
})

// Delete transaction
router.delete('/:id', async(req, res) => {
    //To do: delete transaction with specific transId
    try {
        await res.transaction.remove()
        res.json({
            message: "Delete transaction:" + transaction.transId
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

async function getTransaction (req, res, next)  {
    let transaction
    try {
        transaction = await Transaction.findById(req.params.id)
        if (transaction == null) {
            return res.status(404).json({
                message: "Transaction not found"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
    res.transaction = transaction
    next()
}

module.exports = router