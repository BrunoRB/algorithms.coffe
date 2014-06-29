### @author Tayllan Búrigo 2014 ###

amountOfDigits = (number) ->
    return 1 if number is 0

    counter = 0

    while parseInt(number) > 0
        number /= 10
        counter += 1

    while parseInt(number) < 0
        number /= 10
        counter += 1

    return counter

karatsubaMultiplication = (numberA, numberB) ->
    amountOfDigitsInA = amountOfDigits(numberA)
    amountOfDigitsInB = amountOfDigits(numberB)
    base = parseInt(10 ** (if amountOfDigitsInA <= amountOfDigitsInB then amountOfDigitsInA else amountOfDigitsInB) - 1)
  
    aOne = numberA // base
    aTwo = parseInt(numberA % base)
  
    bOne = numberB // base
    bTwo = parseInt(numberB % base)
  
    z0 = parseInt(aTwo * bTwo)
    z2 = parseInt(aOne * bOne)
    z1 = parseInt((aOne + aTwo) * (bOne + bTwo) - z0 - z2)
  
    result = parseInt((z2 * base * base) + (z1 * base) + (z0))
  
    return result
  
try
    module.exports = karatsubaMultiplication
catch exception
    window.algCoffe =  if window.algCoffe then window.algCoffe else {}
    window.algCoffe.karatsubaMultiplication = karatsubaMultiplication