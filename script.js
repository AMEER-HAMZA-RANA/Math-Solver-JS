const inputElement = document.querySelector('#equation')
const outputElement = document.querySelector('#results')
const form = document.querySelector("#equation-form")


const EXPONENET_REGEX = /(?<operand_1>\S+)\s*(?<operator>\^)\s*(?<operand_2>\S+)/;
const PARANTHESIS_REGEX = /\((?<equation>[^\(\)]*)\)/;
const ADD_SUBTRACT_REGEX = /(?<operand_1>\S+)\s*(?<operator>(?<!e)[\+\-])\s*(?<operand_2>\S+)/;
// const ADD_SUBTRACT_REGEX = /(?<operand_1>-?\d+)\s*(?<operator>[\+\-])\s*(?<operand_2>-?\d+)/;
const MULTIPLY_DIVIDE_REGEX = /(?<operand_1>\S+)\s*(?<operator>[\/\*])\s*(?<operand_2>\S+)/;



console.log("2+3".match(ADD_SUBTRACT_REGEX))

document.addEventListener("submit", e => {
  e.preventDefault()

  let equation = inputElement.value
  let result = parse(equation)
  outputElement.textContent = result

})

function parse(equation) {
  console.log("equation", equation)
  if(equation.match(PARANTHESIS_REGEX)) {
    const insideEq = equation.match(PARANTHESIS_REGEX).groups.equation
    const result = parse(insideEq)
    const newEquation = equation.replace(equation.match(PARANTHESIS_REGEX)[0], result)
    return parse(newEquation)
  } else if(equation.match(EXPONENET_REGEX)) {
    const result = handleMath(equation.match(EXPONENET_REGEX).groups)
    const newEquation = equation.replace(EXPONENET_REGEX, result)
    return parse(newEquation)
  } else if(equation.match(MULTIPLY_DIVIDE_REGEX)) {
    const result = handleMath(equation.match(MULTIPLY_DIVIDE_REGEX).groups)
    const newEquation = equation.replace(MULTIPLY_DIVIDE_REGEX, result)
    return parse(newEquation)
  } else if(equation.match(ADD_SUBTRACT_REGEX)) {
    const result = handleMath(equation.match(ADD_SUBTRACT_REGEX).groups)
    const newEquation = equation.replace(ADD_SUBTRACT_REGEX, result)
    return parse(newEquation)
  }
  return parseFloat(equation)
}


function handleMath({operand_1, operand_2, operator}) {
  operand_1 = parseFloat(operand_1)
  operand_2 = parseFloat(operand_2)

  switch(operator) {
    case "*" :
      return operand_1 * operand_2
    case "/" :
      return operand_1 / operand_2
    case "+" :
      return operand_1 + operand_2
    case "-" :
      return operand_1 - operand_2
    case "^" :
        return operand_1 ** operand_2
  }
}