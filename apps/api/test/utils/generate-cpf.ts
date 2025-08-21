export function generateCPF(formatted: boolean = false): string {
  const generateBaseDigits = (): number[] => {
    // Ensure not all digits are the same (commonly considered invalid)
    while (true) {
      const digits: number[] = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
      const allSame = digits.every((d) => d === digits[0])
      if (!allSame) return digits
    }
  }

  const calculateCheckDigit = (digits: number[], startFactor: number): number => {
    let sum = 0
    for (let index = 0; index < digits.length; index++) {
      sum += digits[index] * (startFactor - index)
    }
    const remainder = sum % 11
    return remainder < 2 ? 0 : 11 - remainder
  }

  const baseDigits = generateBaseDigits()
  const firstCheckDigit = calculateCheckDigit(baseDigits, 10)
  const secondCheckDigit = calculateCheckDigit([...baseDigits, firstCheckDigit], 11)

  const allDigits = [...baseDigits, firstCheckDigit, secondCheckDigit]
  const digitsOnly = allDigits.join("")

  if (!formatted) return digitsOnly

  // Format as XXX.XXX.XXX-XX
  return `${digitsOnly.substring(0, 3)}.${digitsOnly.substring(3, 6)}.${digitsOnly.substring(6, 9)}-${digitsOnly.substring(9, 11)}`
}

export default generateCPF


