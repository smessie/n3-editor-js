config = {
	http: {
		hostname: 'http://127.0.0.1',
		serviceHostname: 'http://localhost',
		port: 3002,
		servicePort: 3002
	},

	reasoners: {
		eye: {
			exec: "./opt/eye/bin/eye",
			folder: "./lib/eye"
		},
		cwm: {
			// (use python2 for cwm)
			pythonCmd: "python",
			exec: "/Users/wvw/cwm-1.2.1/swap/cwm.py"
		},
		jen3: {
			exec: "./lib/jen3/jen3.jar",
			codegen: "./lib/jen3/codegen.jar",
			folder: "./lib/jen3"
		}
	},

	link: {
		max_len: 50000,
		db: {
			port: '33060',
			host: 'localhost',
			db: "n3_links",
			user: 'root',
			pwd: ''
		}
	},

	path: "."
}

if (typeof exports === 'object' && typeof module === 'object')
	module.exports = {
		config
	};
