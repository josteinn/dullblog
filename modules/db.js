
// setup connection -------------------------
const pg = require('pg');
const dbURI = "postgres://xcngmtthytjjfb:0431c207708dd40edb4aaf0c34df118d575b4d718b2c3fa09b9c09c96751696f@ec2-52-214-178-113.eu-west-1.compute.amazonaws.com:5432/du8qbstpr1kef";
const connstring  = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
    connectionString: connstring,
    ssl: { rejectUnauthorized: false }
 });

// database methods -------------------------
let dbMethods = {}; //create empty object

// ------------------------------------
dbMethods.getAllBlogPosts = function() {
    let sql = "SELECT * FROM blogposts";	
	return pool.query(sql); //return the promise	
}

// ------------------------------------
dbMethods.createBlogPost = function(heading, blogtext, userid) {  
    let sql = "INSERT INTO blogposts (id, date, heading, blogtext, userid) VALUES(DEFAULT, DEFAULT, $1, $2, $3) returning *";
	let values = [heading, blogtext, userid];	
    return pool.query(sql, values); //return the promise
}

// ------------------------------------
dbMethods.deleteBlogPost = function(id) {  
    let sql = "DELETE FROM blogposts WHERE id = $1 RETURNING *";
	let values = [id];	
    return pool.query(sql, values); //return the promise
}

// ------------------------------------
dbMethods.getAllUsers = function() {
    let sql = "SELECT id, username FROM users";	
	return pool.query(sql); //return the promise	
}

// ------------------------------------
dbMethods.getUser = function(username) {
    let sql = "SELECT * FROM users WHERE username = $1";
    let values = [username];	
	return pool.query(sql, values); //return the promise	
}

// ------------------------------------
dbMethods.createUser = function(username, password, salt) {  
    let sql = "INSERT INTO users (id, username, password, salt) VALUES(DEFAULT, $1, $2, $3) returning *";
	let values = [username, password, salt];	
    return pool.query(sql, values); //return the promise
}

// ------------------------------------
dbMethods.deleteUser = function(id) {  
    let sql = "DELETE FROM users WHERE id = $1 RETURNING *";
	let values = [id];	
    return pool.query(sql, values); //return the promise
}

// export dbMethods -------------------------
module.exports = dbMethods;

