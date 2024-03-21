const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")
const path = require("path")  
const PROTO_PATH = path.join(__dirname,"./news.proto")
const PORT = 8082

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
}

var packageDefinition = protoLoader.loadSync(PROTO_PATH,options)

var NewsService = grpc.loadPackageDefinition(packageDefinition).NewsService

const client = new NewsService(`localhost:${PORT}`,grpc.credentials.createInsecure());
client.getAllNews({}, (error, news) => {
  if (error) throw error
    console.log(news);
});

module.exports = client