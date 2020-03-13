/*  Global NameSpace  */
const ns = {}
ns.ss = SpreadsheetApp.getActive()
ns.sh = {
  faq: ns.ss.getSheetByName('faq')
}

/* ===================================================================== */


function getAllQuestions() {
  const [header, ...rows] = ns.sh.faq.getDataRange().getValues()
  
  const questions = rows.map(function(row) {
    const question = {}
    header.forEach((v, i) => {
      question[v] = row[i]
    })
    question.keyword = question.keyword ? question.keyword.split(',') : []
    return question
  })
  return JSON.stringify(questions)
}