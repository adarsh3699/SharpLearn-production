import React from 'react';
import './loader.css';

function Loader({ isLoading, sx }) {
	return (
		<>
			{isLoading ? (
				<div id="loadingIcon" style={sx}>
					<div className="lds-spinner">
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
