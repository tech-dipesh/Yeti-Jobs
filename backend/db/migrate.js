import "dotenv/config"
import {readdirSync, readFileSync} from "node:fs"
import {join} from "node:path"
import connect from "../src/db.js"
;(async()=>{
  try {
    const {dirname}=import.meta;
    console.log('director is', dirname)
    const files = readdirSync(dirname)
    for(let i=0;i<files.length;i++){
      const filePath = join(dirname, files[i]);
      const command=readFileSync(filePath, "utf-8")
      await connect.query(command)
    }
  } catch (error) {
    console.log(error)
  }finally{
    await connect.end();
  }
})()
