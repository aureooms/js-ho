
/**
 * Iterated Greedy
 *
 * @param first
 */

export function* IG ( [ solution , best ] , localsearch , alter , pivoting , walk , evaluate ) {

	[ solution , best ] = localsearch( [ solution , best ] ) ;

	candidate = solution;

	while ( true ) {

		const [ candidate , fitness ] = localsearch( alter( [ solution , best ] ) ) ;

		if ( fitness >= best || accept( fitness , best ) ) {

			solution = candidate ;
			best = fitness ;

		}

		yield [ solution , best ] ;

	}

}
