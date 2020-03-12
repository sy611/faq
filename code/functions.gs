/*  Global NameSpace  */
const ns = {}
ns.ss = SpreadsheetApp.getActive()
ns.sh = {
  faq: ns.ss.getSheetByName('faq')
}

/* ===================================================================== */


function getAllQuestions() {
  Utilities.sleep(3000)
  const [header, ...rows] = ns.sh.faq.getDataRange().getValues()
  
  const questions = rows.map(function(row) {
    const question = {}
    header.forEach((v, i) => {
      question[v] = row[i]
    })
    question.keyword = question.keyword ? question.keyword.split(',') : []
    return question
  })
  console.log(JSON.stringify(questions, null, 2))
  return JSON.stringify(questions)
}