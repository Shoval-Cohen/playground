console.log('lets start');

console.log('the env is: ' + JSON.stringify( process.env));

Object.keys(process.env).forEach(k => 
    {
        if(k === 'myLove')
        console.log(`${k} -> ${process.env[k]}`)
    });