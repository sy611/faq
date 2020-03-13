function doGet() {
  const htmlOutputName = ['js', 'css']
  const code = {}
  htmlOutputName.forEach(function(name) {
    code[name] = HtmlService.createHtmlOutputFromFile(`html/${name}`).getContent()
  })
  
  const temp = HtmlService.createTemplateFromFile('html/index')
  temp.code = code
  
  return temp.evaluate()
             .addMetaTag('viewport', 'initial-scale=1.0')
             .setTitle('Material Search')
}