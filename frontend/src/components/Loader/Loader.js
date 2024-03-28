import React from 'react';
import './loader.css';

function Loader({ isLoading, sx, sx2 }) {
	return (
		<>
			{isLoading ? (
				<div id="loadingIcon" style={sx}>
					<div className="lds-spinner" style={sx2}>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			) : null}
		</>
	);
}

export default Loader;
