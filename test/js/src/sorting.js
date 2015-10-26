
/**
 * This test suite sorts a list
 * using different kinds of metaheuristics.
 */

var itertools = require( 'aureooms-js-itertools' ) ;
var head = itertools.head ;
var max = itertools.max ;
var frame = itertools.frame ;
var range = itertools.range ;
var list = itertools.list ;

var compare = require( 'aureooms-js-compare' ) ;
var increasing = compare.increasing ;
var attr = compare.attr ;

var array = require( 'aureooms-js-array' ) ;
var random = require( 'aureooms-js-random' ) ;

function count_inversions ( solution ) {

	var n = solution.length ;
	var inversions = 0 ;

	for ( var i = 0 ; i < n ; ++i ) {

		for ( var j = i + 1 ; j < n ; ++j ) {

			if ( solution[i] > solution[j] ) inversions += 1 ;

		}

	}

	return inversions ;

}

function evaluate ( solution , mutation ) {

	var i = mutation[0] ;
	var j = mutation[1] ;
	var a = solution.slice( 0 ) ;

	a[i] = solution[j] ;
	a[j] = solution[i] ;

	return -count_inversions( a ) ;

}

function apply ( solution , mutation ) {

	var i = mutation[0] ;
	var j = mutation[1] ;
	var a = solution.slice( 0 ) ;

	var tmp = solution[i] ;
	solution[i] = solution[j] ;
	solution[j] = tmp ;

}

function walk ( solution ) {

	return frame( range( solution.length ) , 2 ) ;

}

function walk_1 ( solution ) {

	return frame( range( solution.length * 2 / 3 | 0 ) , 2 ) ;

}

function walk_2 ( solution ) {

	return frame( range( solution.length / 3 | 0 , solution.length ) , 2 ) ;

}

var II = ho.II ;
var VND = ho.VND ;
var best = ho.best ;
var first = ho.first ;
var first_or_equal = ho.first_or_equal ;
var first_and_equal = ho.first_and_equal ;

function init ( n ) {

	var solution = array.alloc( n ) ;
	array.iota( solution , 0 , n , 0 ) ;

	random.shuffle( solution , 0 , n ) ;

	var inversions = count_inversions( solution ) ;

	return [ solution , -inversions ] ;

}

var test_method = function ( name , method ) {

	test( 'sorting : ' + name , function ( assert ) {

		var n = 20 ;

		var candidates = method( init( n ) ) ;

		var output = max( attr( increasing , 1 ) , candidates ) ;

		assert.equal( output[1] , 0 , 'fitness is 0' ) ;
		assert.deepEqual( output[0] , list( range( n ) ) , 'solution is sorted' ) ;

	} ) ;

} ;

test_method( 'II/best' , function ( x ) {
	return II( x , best , walk , evaluate , apply ) ;
} ) ;

test_method( 'II/first' , function ( x ) {
	return II( x , first , walk , evaluate , apply ) ;
} ) ;

test_method( 'II/first_or_equal' , function ( x ) {
	return II( x , first_or_equal , walk , evaluate , apply ) ;
} ) ;

test_method( 'II/first_and_equal' , function ( x ) {
	return II( x , first_and_equal , walk , evaluate , apply ) ;
} ) ;

test_method( 'VND/best' , function ( x ) {
	var neighborhoods = [
		{
			pivoting : best ,
			apply : apply ,
			walk : walk_1 ,
			evaluate : evaluate
		} ,
		{
			pivoting : best ,
			apply : apply ,
			walk : walk_2 ,
			evaluate : evaluate
		}
	] ;
	return VND( x , neighborhoods.length , neighborhoods ) ;
} ) ;

test_method( 'VND/first' , function ( x ) {
	var neighborhoods = [
		{
			pivoting : first ,
			apply : apply ,
			walk : walk_1 ,
			evaluate : evaluate
		} ,
		{
			pivoting : first ,
			apply : apply ,
			walk : walk_2 ,
			evaluate : evaluate
		}
	] ;
	return VND( x , neighborhoods.length , neighborhoods ) ;
} ) ;

test_method( 'VND/first_or_equal' , function ( x ) {
	var neighborhoods = [
		{
			pivoting : first_or_equal ,
			apply : apply ,
			walk : walk_1 ,
			evaluate : evaluate
		} ,
		{
			pivoting : first_or_equal ,
			apply : apply ,
			walk : walk_2 ,
			evaluate : evaluate
		}
	] ;
	return VND( x , neighborhoods.length , neighborhoods ) ;
} ) ;

test_method( 'VND/first_and_equal' , function ( x ) {
	var neighborhoods = [
		{
			pivoting : first_and_equal ,
			apply : apply ,
			walk : walk_1 ,
			evaluate : evaluate
		} ,
		{
			pivoting : first_and_equal ,
			apply : apply ,
			walk : walk_2 ,
			evaluate : evaluate
		}
	] ;
	return VND( x , neighborhoods.length , neighborhoods ) ;
} ) ;