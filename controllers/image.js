const Clarifai =require('clarifai')

const app = new Clarifai.App({
 apiKey: '019eb72382594c56929de5fe4b3fba43'
});

const handleApiCall={
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)	
	.then(data=>{
		return res.json(data);
	})
	.catch(err=>res.status(400).json('unable to work with APIs'))
}


const handleImage=(req, res,db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}
module.exports={
	handleImage,
	handleApiCall
}