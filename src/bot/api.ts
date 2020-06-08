import fetch from 'node-fetch';

export async function fetchQuote(): Promise<string> {
    const request = await fetch('https://api.chucknorris.io/jokes/random');
    const json = await request.json();
    
    return json.value;
}