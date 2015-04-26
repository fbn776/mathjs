'use strict';

function factory (type, config, load, typed) {
  /**
   * Create a Matrix. The function creates a new `math.type.Matrix` object from
   * an `Array`. A Matrix has utility functions to manipulate the data in the
   * matrix, like getting the size and getting or setting values in the matrix.
   * Supported storage formats are 'dense' and 'sparse'.
   *
   * Syntax:
   *
   *    math.matrix()               // creates an empty matrix using default storage format (dense).
   *    math.matrix(data)           // creates a matrix with initial data using default storage format (dense).
   *    math.matrix('dense')        // creates an empty matrix using the given storage format.
   *    math.matrix(data, 'dense')  // creates a matrix with initial data using the given storage format.
   *    math.matrix(data, 'sparse')  // creates a sparse matrix with initial data.
   *
   * Examples:
   *
   *    var m = math.matrix([[1, 2], [3, 4]]);
   *    m.size();                        // Array [2, 2]
   *    m.resize([3, 2], 5);
   *    m.valueOf();                     // Array [[1, 2], [3, 4], [5, 5]]
   *    m.get([1, 0])                    // number 3
   *
   * See also:
   *
   *    bignumber, boolean, complex, index, number, string, unit, sparse
   *
   * @param {Array | Matrix} [data]    A multi dimensional array
   * @param {string} [format]          The Matrix storage format
   *
   * @return {Matrix} The created matrix
   */
  return typed('matrix', {
    '': function () {
      return _create([]);
    },

    'string': function (format) {
      return _create([], format);
    },

    'Array': function (data) {
      return _create(data);
    },
    
    'Matrix': function (data) {
      return _create(data, data.storage());
    },
    
    'Array | Matrix, string': _create
  });

  /**
   * Create a new Matrix with given storage format
   * @param {Array} data
   * @param {string} [format]
   * @returns {Matrix} Returns a new Matrix
   * @private
   */
  function _create(data, format) {
    // get storage format constructor
    var M = type.Matrix.storage(format || 'default');

    // create instance
    return new M(data);
  }
}

exports.name = 'matrix';
exports.factory = factory;