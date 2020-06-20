const {MongoClient} = require("mongodb");
const {mongourl,mongoname} = require("../config.json");
const ObjectId = require("mongodb").ObjectID;
//连接mongo数据库
async function connect (){
    let result;
    try{
       let client = await MongoClient.connect(mongourl,{
           useNewUrlParser:true,
           useUnifiedTopology:true
       })
       let db = client.db(mongoname);
       result = {
           client,
           db
       }
    }catch(err){
        result = err;
    }
    return result;
}
/**
 * 增
 * data array[obj,...]
 */
async function create (colName,data){
    let {db,client} = await connect();
    let col = db.collection(colName);
    let result = await col.insertMany(data);
    client.close();
    return result;
}
/**
 * 删
 * 根据_id删除query为一个对象{_id:....}
 * 根据数据特征删除query为一个数组[{},{}]
 */
async function remove(colName,query){
    let{db,client} = await connect();
    let col = db.collection(colName);
    let result;
    if(query._id){
       result = await col.deleteMany({$or:[{_id:ObjectId(query._id)}]});
    }else{
       result = await col.deleteMany({$or:query})
    }
}
/**
 * 改
 */
async function update(colName,query,data){
    let{db,client} = await connect();
    let col = db.collection(colName);
    let result;
    if(query._id){
        result = await col.updateMany({_id:ObjectId(query._id)},{$set:data});
    }else{
        result = await col.updateMany({query},{$set:data});
    }
    client.close();
    return result;
}
/**
 * 查
 */
async function find(colName,query={},page,sk){
    let {db,client} = await connect();
    let result;
    let col = db.collection(colName);
    if(page){
        page = page - 1;
        if(Array.isArray(query)){result = await col.find({$or:query}).skip(sk*page-0).limit(sk-0).toArray()}
        else{result = await col.find(query).skip(sk*page-0).toArray();}
    }else{
        if(Array.isArray(query)){result = await col.find({$or:query}).toArray()}
        else{result = await col.find(query).toArray()};
    }
    client.close();
    return result;
}
module.exports = {
    create,
    remove,
    update,
    find
}