const express=require('express')
const bodyParser =require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors= require('cors');
const knex=require('knex')

const db=knex({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'mysql.sd',
    database : 'smartBrain'
  }
});

// db.select('*').from('users').then(data=>{
// 	console.log(data);	
// })

const app =express();

const database={
	users:[
	{
		id:'123',
		name:'John',
		email:'john@gmail.com',
		password:'cookies',
		entries:0,
		joined: new Date()
	},
	{
		id:'124',
		name:'Sally',
		email:'sally@gmail.com',
		password:'bananas',
		entries:0,
		joined: new Date()
	}
	],
	login:[
	{
		id:'987',
		hash:'',
		email:'john@gmail.com'
	}]
}

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
	res.send(database.users);
})

app.post('/signin',(req,res)=>{
	bcrypt.compare('redemption','$2a$10$4EgT9Gi31y8X7C2Lg7KdLuTk5OGGfBH4ZqsJbDJfuR9kgml224ma.', function(err, res) {
	    console.log('first guess'+res);
	});

	bcrypt.compare('redemption', '$2a$10$sBek10Av/rUM8.P/D3ZZHuHT8DKOLUyXxlpgrQP1WFEYMsIZAzMOi', function(err, res) {
	    console.log('second guess'+res);
	});
	if(req.body.email===database.users[0].email && req.body.password===database.users[0].password)
		{res.json(database.users[0]);}
	else
		res.status(400).json('error logging in');
})

app.post('/register',(req,res)=>{
	const{email, name,password}= req.body;
	// bcrypt.hash(password, null,null, function(err, hash) {
 	//console.log(hash);
	// });
	// console.log('line 76');
	const hash=bcrypt.hashSync(password);
	db('users')
		.insert({
		email:email,
		name:name,
		joined:new Date()
	}).then(userID=>{
		// console.log('line 83');
		// console.log('id is '+userID);
		db('users').where({ID:userID}).select('ID','name','email','entries','joined').then(data=>{
		console.log(data);
		return res.json(data);	
		})
		}).catch(err=> res.status(400).json(err));
	// if u donot send the response then client just donot get the response his webpages just hang in there
})
/**somecommenst  default value id is auto incremented changed in dbms added*/
app.get('/profile/:id',(req,res)=>{
	const {id}= req.params;
	db.select('*').from('users').where({
		id:id
	}).then(user=> {
		if(user.length)
			return res.json(user[0])
		else
			res.status(400).json('Not found')
	})
	.catch(err=> res.status(400).json('unable to get user'))
})

app.put('/image',(req,res)=>{
	const{id}= req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.catch(err=> res.status(400).json('unable to get the entries'))
	db.select('entries').from('users').where({
		id:id
	}).then(user=>{
		console.log(user[0].entries);
		res.json(user[0].entries);
	})
	.catch(err=> res.status(400).json('unable to get the entries'))
})


// //Load hash from your password DB.

app.listen(3000,()=>{
	console.log('app is running on port 3000')
})

/*
signin post success/fail
register post user
profile/userid get user
/image put user for rank and inc count
*/