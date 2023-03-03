export const postForm = async (bodyParams) => {
 const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(bodyParams)
 }
 const res = await fetch('https://wavescan-internship.saurabhmudgal.repl.co/submitForm', requestOptions)
 if (res.status !== 200) throw new Error('Failed to post form');
 return res;
}

export const getScanners = async () => {
 const res = await fetch('https://wavescan-internship.saurabhmudgal.repl.co/success')
 if (res.status !== 200) throw new Error('Failed to get scanners')
 return res.json();
}

