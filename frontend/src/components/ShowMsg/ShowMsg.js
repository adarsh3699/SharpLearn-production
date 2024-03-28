import React from 'react';

import './showMsg.css';

function ShowMsg({ isError, msgText, type }) {
	return (
		isError && (
			<div id="msgBox">
				<div id="textMsg" className={type}>
					{msgText}
				</div>
			</div>
		)
	);
}

export default ShowMsg;
