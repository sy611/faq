/*  Global NameSpace  */
const ns = {}
ns.ss = SpreadsheetApp.getActive()
ns.sh = {
  faq: ns.ss.getSheetByName('records')
}

/* ===================================================================== */


function getAllRecords() {
  const [header, ...rows] = ns.sh.records.getDataRange().getValues()
  
  const records = rows.map(function(row) {
    const record = {}
    header.forEach((v, i) => {
      record[v] = row[i]
    })
    record.keyword = record.keyword ? record.keyword.split(',') : []
    return record
  })
  return JSON.stringify(records)
}