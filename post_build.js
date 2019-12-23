
let find = require('find');
let fs = require('fs');

let dirname = __dirname + '/compiled'
let files = find.fileSync('reducer.js', dirname);
find.file(/\.js$/, dirname, function (files) {
    console.log(files.length);
    files.map(item => {
       let  result =  fs.readFileSync(item)
       let body = result.toString();
        if(body.includes('.jsx'))
        {
            console.log(item);

            result=body.replace('.jsx','.js');
            const data = new Uint8Array(Buffer.from(result));
            fs.writeFileSync(item,data)
        }
        //fs.writeFileSync(dirname + '/reducers.scenes.js', data);

    })
})

console.log('REDUCES FINISHED');
