//Reader
var reader = new FileReader();
reader.onload = Compute

//input
var numCylinders
var strtPosition
var seekTime 

//file
var dataFile
var fileTextArray
var filenameExtension

//I/O
var inputFIFO
var outputFIFO
var inputSSF
var outputSSF = []
var inputSCAN
var outputSCAN
var inputCSCAN
var outputCSCAN

//table
var numFIFO = document.getElementById('numFIFO')
var avgFIFO = document.getElementById('avgFIFO')
var varFIFO = document.getElementById('varFIFO')
var stdFIFO = document.getElementById('stdFIFO')
var avgtFIFO = document.getElementById('avgtFIFO')
var vartFIFO = document.getElementById('vartFIFO')
var stdtFIFO = document.getElementById('stdtFIFO')
var downloadFIFO = document.getElementById('downloadFIFO')

var numSSF = document.getElementById('numSSF')
var avgSSF = document.getElementById('avgSSF')
var varSSF = document.getElementById('varSSF')
var stdSSF = document.getElementById('stdSSF')
var avgtSSF = document.getElementById('avgtSSF')
var vartSSF = document.getElementById('vartSSF')
var stdtSSF = document.getElementById('stdtSSF')
var downloadSSF = document.getElementById('downloadSSF')

var numSCAN = document.getElementById('numSCAN')
var avgSCAN = document.getElementById('avgSCAN')
var varSCAN = document.getElementById('varSCAN')
var stdSCAN = document.getElementById('stdSCAN')
var avgtSCAN = document.getElementById('avgtSCAN')
var vartSCAN = document.getElementById('vartSCAN')
var stdtSCAN = document.getElementById('stdtSCAN')
var downloadSCAN = document.getElementById('downloadSCAN')

var numCSCAN = document.getElementById('numCSCAN')
var avgCSCAN = document.getElementById('avgCSCAN')
var varCSCAN = document.getElementById('varCSCAN')
var stdCSCAN = document.getElementById('stdCSCAN')
var avgtCSCAN = document.getElementById('avgtCSCAN')
var vartCSCAN = document.getElementById('vartCSCAN')
var stdtCSCAN = document.getElementById('stdtCSCAN')
var downloadCSCAN = document.getElementById('downloadCSCAN')



//

//Disk Scheduling Algorithms
function FIFO() {
  inputFIFO = fileTextArray.slice()
  outputFIFO = inputFIFO.join
  var position = strtPosition
  var count = 0
  var average = 0
  var variance = 0
  var arrayLength = inputFIFO.length
  for (var i = 0 ; i < arrayLength ; i++) {
    count += Math.abs(position - inputFIFO[i])
    position = inputFIFO[i]
  }
  average = count / arrayLength
  position = strtPosition
  for (var i = 0 ; i < arrayLength ; i++) {
    variance += Math.pow((Math.abs(position - inputFIFO[i]) - average), 2)
    position = inputFIFO[i]
  }
  variance /= arrayLength
  numFIFO.innerHTML = count
  avgFIFO.innerHTML = average
  varFIFO.innerHTML = variance
  stdFIFO.innerHTML = Math.sqrt( variance )
  avgtFIFO.innerHTML = count * seekTime
  variance *= Math.pow( seekTime, 2)
  vartFIFO.innerHTML = variance
  stdtFIFO.innerHTML = Math.sqrt( variance )
}

function SSF() {
  inputSSF = fileTextArray.slice()
  var position = strtPosition
  var index = 0
  var arrayLength = inputSSF.length
  var count = 0
  var average = 0
  var variance = 0
  while(arrayLength > 0) {
    index = 0
    for (var i = 0; i < arrayLength; i++){
      if (Math.abs(position - inputSSF[i]) < Math.abs(position - inputSSF[index])) {
	index = i
      }
    }
    count += Math.abs(position - inputSSF[index])
    position = inputSSF[index]
    outputSSF.push(inputSSF.splice(index,1)).join
    arrayLength = inputSSF.length
  }
  inputSSF = fileTextArray.slice()
  arrayLength = inputSSF.length
  average = count / arrayLength
  position = strtPosition
  while (arrayLength > 0) {
    index = 0
    for (var i = 0; i < arrayLength; i++) {
      if (Math.abs(position - inputSSF[i]) < Math.abs(position - inputSSF[index])) {
        index = i
      }
    }
    variance += Math.pow( (Math.abs(position - inputSSF[index]) - average) ,2)
    position = inputSSF[index]
    inputSSF.splice(index,1)
    arrayLength = inputSSF.length
  }
  inputSSF = fileTextArray.slice()
  arrayLength = inputSSF.length
  variance /= arrayLength
  numSSF.innerHTML = count
  avgSSF.innerHTML = average
  varSSF.innerHTML = variance
  stdSSF.innerHTML = Math.sqrt(variance)
  avgtSSF.innerHTML = count * seekTime
  variance *= Math.pow(seekTime, 2)
  vartSSF.innerHTML = variance
  stdtSSF.innerHTML = Math.sqrt(variance)
}

function SCAN() {
  inputSCAN = fileTextArray

}

function CSCAN() {
  inputCSCAN = fileTextArray

}

//Set/Ready input variables
function getInputData() {
  var inputForm = document.getElementById('inputForm')
  numCylinders = inputForm.elements.namedItem('numCylinders').value
  strtPosition = inputForm.elements.namedItem('strtPosition').value
  seekTime = inputForm.elements.namedItem('seekTime').value
  dataFile = inputForm.elements.namedItem('dataFile').files[0]
  reader.readAsText(dataFile)
}

//Run the simulation
function Compute() {
  fileTextArray = reader.result.split('-').map(Number)
  fileTextArray.pop()
  filenameExtension = dataFile.name.split('.')[1]
  FIFO()
  SSF()
  SCAN()
  CSCAN()
  enableDownload()
}

//Make downloadable files
function enableDownload() {
  downloadFIFO.innerHTML = `<a href='data:plain/text;charset=utf-8,${outputFIFO}' download='fifo.${filenameExtension}'>output FIFO</a>`
  downloadSSF.innerHTML  = `<a href='data:plain/text;charset=utf-8,${outputSSF}' download='ssf.${filenameExtension}'>output SSF</a>`
  downloadSCAN.innerHTML = `<a href='data:plain/text;charset=utf-8,${outputSCAN}' download='scan.${filenameExtension}'>output SCAN</a>`
  downloadCSCAN.innerHTML = `<a href='data:plain/text;charset=utf-8,${outputCSCAN}' download='cscan.${filenameExtension}'>output CSCAN</a>`
}
