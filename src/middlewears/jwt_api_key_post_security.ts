import * as jwt from 'jsonwebtoken';
export default function jwt_api_key_get_security(req,res,next){
    jwt.verify(req.body.key, process.env.jwt_api_key_hash, function(err, decoded) {
	  if (err) {
	  	res.status(200).json({
            success:false,
            Message: 'You cant fool us'
        });
	  }
	  else{
	  	next();
	  }
	})
};