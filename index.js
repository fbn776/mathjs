var loader = require('./loader');

/**
 * math.js factory function. Creates a new instance of math.js
 *
 * @param {Object} [config] Available configuration options:
 *                            {String} matrix
 *                              A string 'matrix' (default) or 'array'.
 *                            {String} number
 *                              A string 'number' (default) or 'bignumber'
 *                            {Number} precision
 *                              The number of significant digits for BigNumbers.
 *                              Not applicable for Numbers.
 */
function create (config) {
  // create a new, empty math.js instance
  var math = loader.create();
  math.create = create;

  var _config = math._config; // TODO: cleanup as soon as redundant

  // util methods for Arrays and Matrices
  math.import(require('./lib/type/collection'));

  // expression (parse, Parser, node.*, docs.*)
  math.import(require('./lib/expression/node'));
  math.import(require('./lib/expression/parse'));
  math.import(require('./lib/expression/Parser'));
  math.expression.docs = require('./lib/expression/docs');

  // data types (Matrix, Complex, Unit, ...)
  math.type.Complex = require('./lib/type/Complex');
  math.type.Range = require('./lib/type/Range');
  math.type.Index = require('./lib/type/Index');
  math.import(require('./lib/type/Matrix'));
  math.type.Unit = require('./lib/type/Unit');
  math.type.Help = require('./lib/type/Help');
  math.type.ResultSet = require('./lib/type/ResultSet');
  math.import(require('./lib/type/BigNumber'));
  math.import(require('./lib/type/FibonacciHeap'));
  
  // matrix storage formats
  math.import(require('./lib/type/matrix/SparseMatrix'));
  math.import(require('./lib/type/matrix/DenseMatrix'));

  // sparse accumulator
  math.import(require('./lib/type/matrix/Spa'));

  // serialization utilities
  // math.json.*
  math.import(require('./lib/json/reviver'));

  // functions - algebra/decomposition
  math.import(require('./lib/function/algebra/decomposition/lup'));
  
  // functions - algebra/solver
  math.import(require('./lib/function/algebra/solver/lusolve'));
  
  // functions
  math.import(require('./lib/function/arithmetic'));
  math.import(require('./lib/function/bitwise'));
  math.import(require('./lib/function/complex'));
  math.import(require('./lib/function/construction'));
  math.import(require('./lib/function/expression'));
  math.import(require('./lib/function/logical'));

  // functions - matrix
  // TODO: replace with a matrix/index.js file when all functions are refactored
  math.import(require('./lib/function/matrix/concat'));
  math.import(require('./lib/function/matrix/cross'));
  math.import(require('./lib/function/matrix/det'));
  math.import(require('./lib/function/matrix/diag'));
  math.import(require('./lib/function/matrix/dot'));
  math.import(require('./lib/function/matrix/eye'));
  math.import(require('./lib/function/matrix/flatten'));
  math.import(require('./lib/function/matrix/inv'));
  require('./lib/function/matrix/ones')(math, _config);
  require('./lib/function/matrix/range')(math, _config);
  require('./lib/function/matrix/resize')(math, _config);
  math.import(require('./lib/function/matrix/size'));
  math.import(require('./lib/function/matrix/squeeze'));
  require('./lib/function/matrix/subset')(math, _config);
  math.import(require('./lib/function/matrix/trace'));
  math.import(require('./lib/function/matrix/transpose'));
  require('./lib/function/matrix/zeros')(math, _config);

  // functions
  math.import(require('./lib/function/probability'));
  math.import(require('./lib/function/relational'));
  math.import(require('./lib/function/statistics'));
  math.import(require('./lib/function/trigonometry'));
  math.import(require('./lib/function/units/to'));
  math.import(require('./lib/function/utils'));

  // attach transform functions (for converting one-based indices to zero-based)
  math.expression.transform = {
    concat: require('./lib/expression/transform/concat.transform')(math, _config),
    filter: require('./lib/expression/transform/filter.transform')(math, _config),
    forEach:require('./lib/expression/transform/forEach.transform')(math, _config),
    index:  require('./lib/expression/transform/index.transform')(math, _config),
    map:    require('./lib/expression/transform/map.transform')(math, _config),
    max:    require('./lib/expression/transform/max.transform')(math, _config),
    mean:   require('./lib/expression/transform/mean.transform')(math, _config),
    min:    require('./lib/expression/transform/min.transform')(math, _config),
    range:  require('./lib/expression/transform/range.transform')(math, _config),
    subset: require('./lib/expression/transform/subset.transform')(math, _config)
  };

  // create Chain, and create proxies for all functions/constants in the math
  // namespace.
  math.type.Chain = require('./lib/type/Chain')();
  math.type.Chain.createProxy(math);

  // apply custom options
  math.config(config);

  return math;
}

// return a new instance of math.js
module.exports = create();