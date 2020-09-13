const fetch = require('node-fetch');

const URL = 'http://localhost:3000';

var cookie = null;

async function test(){
    console.log('Testing start:\n---------------'); 
    
    //first new session
    await loginUser();

    await getCart();

    await getProducts();

    await getPorchases();
  
}

test();

async function loginUser(){
    const params = new URLSearchParams();
    params.append('email', 'falik@gmail.com');
    params.append('password', '181818');

    try{
        const response = await fetch(URL + '/api/users/login', {method: 'POST', body: params});

        if(response.ok){
            user = await response.text();
            console.log(`\nlogin successfully: ${user}`);
            cookie = await response.headers.raw()['set-cookie'];
        }
        else {
            console.error(`login failed: ${response.status}`);
        }
    } catch (err){
        console.error(err);
    }
}


async function getCart(){
    try{
        const response = await fetch(URL + '/api/cart', {headers: { 'Cookie': cookie }});

        if(response.ok){
            cart = await response.text();
            console.log(`\nGetting Cart end successfully`);
        }
        else {
            console.error(`login failed: ${response.status}`);
        }
    } catch (err){
        console.error(err);
    }

    return cart;
}

async function getProducts(){
    try{
        const response = await fetch(URL + '/api/products', {headers: { 'Cookie': cookie }});

        if(response.ok){
            products = await response.text();
            console.log(`\nGetting products end successfully`);
        }
        else {
            console.error(`login failed: ${response.status}`);
        }
    } catch (err){
        console.error(err);
    }
}

async function getPorchases(){
    try{
        const response = await fetch(URL + '/api/purchases', {headers: { 'Cookie': cookie }});

        if(response.ok){
            products = await response.text();
            console.log(`\nGetting purchases end successfully`);
        }
        else {
            console.error(`login failed: ${response.status}`);
        }
    } catch (err){
        console.error(err);
    }
}
