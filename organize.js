const fs = require('fs')

const path = require('path')

let types = {
       media: ["mp4", "mkv", "mp3"],
       archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
       documents: [
         "docx",
         "doc",
         "pdf",
         "xlsx",
         "xls",
         "odt",
         "ods",
         "odp",
         "odg",
         "odf",
         "txt",
         "ps",
         "tex",
       ],
       app: ["exe", "dmg", "pkg", "deb"],
     };


function organizeFn(dirpath) {
  let destPath;

  if (dirpath == undefined) {
    console.log("Please Enter a valid Directory Path");

    return;
  }
  else {
    let doesExist = fs.existsSync(dirpath);
    if (doesExist == true) {
      destPath = path.join(dirpath, "organized_files");
      if (fs.existsSync(destPath) == false) {
        fs.mkdirSync(destPath);
      }
      else {
        console.log("This folder Already Exists");
      }
    } else {
      console.log("Please Enter a valid Path");
    }
  }
  organizeHelper(dirpath, destPath)
}
function organizeHelper(src, dest) {
  let childNames = fs.readdirSync(src)
  //console.log(childNames)
  for (let i = 0; i < childNames.length; i++) {

    let childAddress = path.join(src, childNames[i])


    let isFile = fs.lstatSync(childAddress).isFile()


    if (isFile == true) {
      let fileCategory = getCategory(childNames[i])
      console.log(childAddress + " belongs to  " + fileCategory)
      sendFiles(childAddress, dest, fileCategory)
    }
  }
}
function getCategory(name) {
  let ext = path.extname(name);
  ext = ext.slice(1); // we will take out the extension names of the files
  console.log(ext)
  for (let type in types) {

    let cTypeArr = types[type] //console.log(cTypeArr)

    for (let i = 0; i < cTypeArr.length; i++) {
      if (ext == cTypeArr[i])

        return type

    }

  }
  return 'others'
}
function sendFiles(srcFilePath, dest, fileCategory) {
  let catPath = path.join(dest, fileCategory)

  if (fs.existsSync(catPath) == false) {
    fs.mkdirSync(catPath)
  }
  let fileName = path.basename(srcFilePath)
  let destFilePath = path.join(catPath, fileName)

  fs.copyFileSync(srcFilePath, destFilePath)

  fs.unlinkSync(srcFilePath)

  console.log(fileName + "is copied to" + fileCategory)

}

     module.exports={
            organizeKey: organizeFn
     }