import { factory } from '../../utils/factory.js'
import { createTrigUnitSignature } from './trigUnitSignature.js'

const name = 'cos'
const dependencies = ['typed']

export const createCos = /* #__PURE__ */ factory(name, dependencies, ({ typed }) => {
  const trigUnitSignature = createTrigUnitSignature({ typed })

  /**
   * Calculate the cosine of a value.
   *
   * To avoid confusion with the matrix cosine, this function does not
   * apply to matrices.
   *
   * Syntax:
   *
   *    math.cos(x)
   *
   * Examples:
   *
   *    math.cos(2)                      // returns number -0.4161468365471422
   *    math.cos(math.pi / 4)            // returns number  0.7071067811865475
   *    math.cos(math.unit(180, 'deg'))  // returns number -1
   *    math.cos(math.unit(60, 'deg'))   // returns number  0.5
   *
   *    const angle = 0.2
   *    math.pow(math.sin(angle), 2) + math.pow(math.cos(angle), 2) // returns number ~1
   *
   * See also:
   *
   *    cos, tan
   *
   * @param {number | BigNumber | Complex | Unit} x  Function input
   * @return {number | BigNumber | Complex} Cosine of x
   */
  return typed(name, {
    number: Math.cos,
    'Complex | BigNumber': x => x.cos()
  }, trigUnitSignature)
})
