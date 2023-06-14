import React from 'react';
import './style.css';

function Loading (message) {
	return (
		<div id="loading" class="loading">
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
    </div>
	)
}

export default Loading;