import ollama from 'ollama'

const response = await ollama.chat({
  model: 'llama2:13b',
  messages: [{ role: 'user', content: 'Why is the sky blue?' }],
})
console.log(response.message.content)