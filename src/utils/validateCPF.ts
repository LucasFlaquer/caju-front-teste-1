const CPF_VALID_LENGTH = 11
const FACTOR_DIGIT_1 = 10
const FACTOR_DIGIT_2 = 11
const MAX_DIGITS_1 = 9
const MAX_DIGITS_2 = 10

export function isValidCPF(value: string | undefined) {
  if (!value) return false
  const cpf = getOnlyNumbers(value)
  if (isLengthInvalid(cpf)) return false
  if (isAllEqual(cpf)) return false
  const digit1 = calculateDigit(cpf, FACTOR_DIGIT_1, MAX_DIGITS_1)
  const digit2 = calculateDigit(cpf, FACTOR_DIGIT_2, MAX_DIGITS_2)
  const nDigVerific = cpf.substring(cpf.length - 2, cpf.length)
  const calculatedCheckDigit = `${digit1}${digit2}`
  return nDigVerific === calculatedCheckDigit
}
function getOnlyNumbers(cpf: string) {
  return cpf.replace(/\D/g, '')
}
function isLengthInvalid(str: string) {
  return str.length !== CPF_VALID_LENGTH
}
function isAllEqual(cpf: string) {
  return cpf.split('').every((c) => c === cpf[0])
}

function toDigitArray(cpf: string) {
  return [...cpf.split('')].map((digit) => parseInt(digit))
}
function calculateDigit(cpf: string, factor: number, max: number) {
  let total = 0
  for (const digit of toDigitArray(cpf).slice(0, max)) {
    total += digit * factor--
  }
  return total % 11 < 2 ? 0 : 11 - (total % 11)
}
