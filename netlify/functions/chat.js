exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { message } = JSON.parse(event.body);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-5.6-luna',
      messages: [
        { 
          role: 'system', 
          content: 'You are a nail style consultant for Nails by Kaz. Make sure to reference the services that Kaz does. Give suggestions for nail designs and styles. Based on the user\'s request, provide helpful advice without any introduction or conclusion and keep replies to less than 50 words.' 
        },

        { 
          role: 'user', 
          content: message }
      ]
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({ reply: data.choices[0].message.content })
  };
};