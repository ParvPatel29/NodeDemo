export const readJsonFile = async (filename: string) => {
  const csvFilePath = __dirname + '/data/' + filename
  const csv = require('csvtojson')

  // Async / await usage
  const jsonArray = await csv().fromFile(csvFilePath)
  return jsonArray
}
