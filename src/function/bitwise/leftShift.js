import { createAlgorithmDS0 } from '../../type/matrix/utils/algorithmDS0.js'
import { createAlgorithmSs0 } from '../../type/matrix/utils/algorithmSs0.js'
import { createAlgorithmDS1 } from '../../type/matrix/utils/algorithmDS1.js'
import { createAlgorithmDs } from '../../type/matrix/utils/algorithmDs.js'
import { createAlgorithmSs1 } from '../../type/matrix/utils/algorithmSs1.js'
import { createAlgorithmS1S0 } from '../../type/matrix/utils/algorithmS1S0.js'
import {
  createMatrixAlgorithmSuite
} from '../../type/matrix/utils/matrixAlgorithmSuite.js'
import { factory } from '../../utils/factory.js'
import { leftShiftNumber } from '../../plain/number/index.js'
import { leftShiftBigNumber } from '../../utils/bignumber/bitwise.js'

const name = 'leftShift'
const dependencies = [
  'typed',
  'matrix',
  'equalScalar',
  'zeros',
  'DenseMatrix'
]

export const createLeftShift = /* #__PURE__ */ factory(name, dependencies, ({ typed, matrix, equalScalar, zeros, DenseMatrix }) => {
  const algorithmDS1 = createAlgorithmDS1({ typed })
  const algorithmDS0 = createAlgorithmDS0({ typed, equalScalar })
  const algorithmS1S0 = createAlgorithmS1S0({ typed, equalScalar })
  const algorithmDs = createAlgorithmDs({ typed })
  const algorithmSs1 = createAlgorithmSs1({ typed, DenseMatrix })
  const algorithmSs0 = createAlgorithmSs0({ typed, equalScalar })
  const matrixAlgorithmSuite = createMatrixAlgorithmSuite({ typed, matrix })

  const leftShiftScalar =
    typed('leftShiftScalar', leftShiftNumber, leftShiftBigNumber)

  /**
   * Bitwise left logical shift of a value x by y number of bits, `x << y`.
   * For matrices, the function is evaluated element wise.
   * For units, the function is evaluated on the best prefix base.
   *
   * Syntax:
   *
   *    math.leftShift(x, y)
   *
   * Examples:
   *
   *    math.leftShift(1, 2)               // returns number 4
   *
   *    math.leftShift([1, 2, 3], 4)       // returns Array [16, 32, 64]
   *
   * See also:
   *
   *    leftShift, bitNot, bitOr, bitXor, rightArithShift, rightLogShift
   *
   * @param  {number | BigNumber | Array | Matrix} x Value to be shifted
   * @param  {number | BigNumber} y Amount of shifts
   * @return {number | BigNumber | Array | Matrix} `x` shifted left `y` times
   */
  return typed(name,
    matrixAlgorithmSuite({
      elop: leftShiftScalar,
      SS: algorithmS1S0,
      DS: algorithmDS1,
      SD: algorithmDS0
    }),
    { // No scalar operations above; special code below
      'SparseMatrix, number | BigNumber': function (x, y) {
        // check scalar
        if (equalScalar(y, 0)) {
          return x.clone()
        }
        return algorithmSs0(x, y, leftShiftScalar, false)
      },

      'DenseMatrix, number | BigNumber': function (x, y) {
        // check scalar
        if (equalScalar(y, 0)) {
          return x.clone()
        }
        return algorithmDs(x, y, leftShiftScalar, false)
      },

      'number | BigNumber, SparseMatrix': function (x, y) {
        // check scalar
        if (equalScalar(x, 0)) {
          return zeros(y.size(), y.storage())
        }
        return algorithmSs1(y, x, leftShiftScalar, true)
      },

      'number | BigNumber, DenseMatrix': function (x, y) {
        // check scalar
        if (equalScalar(x, 0)) {
          return zeros(y.size(), y.storage())
        }
        return algorithmDs(y, x, leftShiftScalar, true)
      },

      'Array, number | BigNumber': typed.referToSelf(self => (x, y) => {
        // use matrix implementation
        return self(matrix(x), y).valueOf()
      }),

      'number | BigNumber, Array': typed.referToSelf(self => (x, y) => {
        // use matrix implementation
        return self(x, matrix(y)).valueOf()
      })
    })
})
