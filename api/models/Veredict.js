'use strict';

module.exports = {
	attributes: {
		run: {
			model: 'run',
		},
		subtask: {
			model: 'subtask'
		},
		autojudge: {
			type: 'string'
		},
		jury: {
			type: 'string'
		},
		owner: {
			model: 'user'
		}
	}
}