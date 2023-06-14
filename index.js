const PORT = 5000;
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
app.use(express.json());
app.use(cors());
const API_KEY = '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';

app.post('/completions',async (req,res)=> {
	const options = {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${API_KEY}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			model: "gpt-3.5-turbo",
			messages: [{role: "user",content: req.body.messages}],
			max_tokens: 1024
		})
	}
	try {
		const response = await fetch('https://api.openai.com/v1/chat/completions',options)
		const data = await response.json();
		res.send(data);
	} catch(err) {
		console.error(err)
	}
});

app.listen(PORT,()=> console.log('Your Server is running on PORT '+ PORT));