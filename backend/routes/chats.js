const express = require("express")
const chat = require("../models/chat")
const router = express.Router()
const Chat = require("../models/chat")

// Get all chat
router.get('/', async (req, res) => {
    try {
        const chats = await Chat.find()
        res.json(chats)
    } catch(err) {
        res.status(500).json({ 
            message: err.message 
        })
    }
})

// Get one chat
router.get('/:id', (req, res) => {
    //To do: return one specific chat
    res.json(res.chat)
})

// Create chat
router.post('/', async(req, res) => {
    const chat = new Chat({
        //To do: generate userId
        chatId: "1",
    })
    try {
        const newChat = await chat.save()
        res.status(201).json(newChat)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

// Update chat
router.patch('/:id', (req, res) => {
    
})

// Delete chat
router.delete('/:id', async(req, res) => {
    //To do: delete chat with specific chatId
    try {
        await res.chat.remove()
        res.json({
            message: "Delete chat:" + chat.chatId
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

async function getChat (req, res, next)  {
    let chat
    try {
        chat = await chat.findById(req.params.id)
        if (chat == null) {
            return res.status(404).json({
                message: "Chat not found"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
    res.chat = chat
    next()
}

module.exports = router