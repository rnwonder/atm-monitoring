import { utils, writeFile } from "xlsx";

const exportDataFunction = (data: any[], tableName: string, fileName: string) => {
  const wb =  utils.book_new();
  let ws = utils.json_to_sheet(data);

  utils.book_append_sheet(wb, ws, tableName)
  writeFile(wb, `${fileName}.xlsx`)
  return true
};

export default exportDataFunction