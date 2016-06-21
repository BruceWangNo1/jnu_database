var mongoose=require('mongoose'),
crypto=require('crypto'),
Schema=mongoose.Schema;

var UserSchema=new Schema({
	username:{
		type: String,
		unique: true,
		required: 'Username is required',
		validate: [function(username){
			return (username && username.length >4) && (username.length <10);
		}, 'Username length should be i the range between 5 and 9 inclusive.']
	},
	email: {
		type: String,
		required: 'Email is required',
		match:[/.+\@.+\..+/, 'Please fill a valid e-mail address']
	},
	password: {
		type: String,
		validate: [function(password){
			return (password && password.length >6) && (password.length<15);
		}, 'Password should be in the range between 7 and 14 inclusive']
	},
	created: {
		type: Date,
		default: Date.now
	},
	salt: {
		type: String
	}
});

UserSchema.pre('save', function(next){
	if(this.password){
		this.salt=new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password=this.hashPassword(this.password);
	}
	next();
});

UserSchema.methods.hashPassword=function(password){
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate=function(password){
	return this.password===this.hashPassword(password);
};

//find unique username for the user if previous username exists. For instance, bruce may become bruce0,bruce1
// UserSchema.statics.findUniqueUsername=function(username, suffix, callback){
// 	var _this=this;

// }

UserSchema.set('toJSON', {
	getters: true,
	virtual: false
});

mongoose.model('Users', UserSchema);