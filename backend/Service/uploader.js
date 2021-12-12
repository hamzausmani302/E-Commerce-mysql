const fs= require('fs');
const path= require('path');
const upload=  (file_info)=>{
    const name = file_info.name;
    const extension =   file_info.extension;
    const content = file_info.buffer;
    let data = new Date.now();
    data=  data.toUTCString();
    let type=  file_info.type.split("/")[1];
    let fullname = name + "-" +data +"."+ type;
    fs.writeFileSync(path.resolve(`../Images/${fullname}`), content);
    

}



module.exports.upload = upload;

