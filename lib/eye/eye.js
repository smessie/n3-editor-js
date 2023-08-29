var { exec } = require('child_process')
var prefix = require('../prefix_map.js')
var { config } = require('../../config.js')

const eyeExec = config.reasoners.eye.exec
const eyeFolder = config.reasoners.eye.folder

exports.exec = function (options, file, queryFile, callback) {
	var cmd = null
	switch (options.task) {

		case 'explain':
			cmd = `${eyeFolder}/explain/explain.sh -f ${eyeFolder} -e ${eyeExec} -r ${file} ${ (options.type == 'xexplain' ? "-x" : "") }`
			break

		default:
			cmd = `${eyeExec} --n3 ${file} --nope --quiet`
			if (queryFile) {
				cmd += ` --query ${queryFile}`
			}
			switch (options.task) {
				case undefined:
					break
				case 'derivations':
					cmd += " --pass-only-new"
					break
				case 'deductive_closure':
					cmd += " --pass"
					break
				case 'deductive_closure_plus_rules':
					cmd += " --pass-all"
					break
				case 'grounded_closure_plus_rules':
					cmd += " --pass-all-ground"
			}
			break
	}

	exec(cmd, (err, stdout, stderr) => {
		// if (err) { throw err }

		if (err) {
			var error = stderr
			if (stderr.includes("**")) {
				var dl = stderr.lastIndexOf("**") + 2
				error = stderr.substring(dl).trim()
			}

			// console.log("error:", error)
			callback({ error: error })

		} else {
			// console.log("stdout", stdout)
			var output = stdout
			switch (options.task) {

				case 'explain':
					break

				default:
					var dl = output.indexOf("\n", output.indexOf("#eye"))
					var dl2 = output.lastIndexOf("\n", output.indexOf("#ENDS") - 2)
					if (dl2 > dl) {
						output = output.substring(dl, dl2).trim()
					}

					output = prefix.collapse(output, file)
					break

			}

			// console.log("output:", output)		  
			callback({ success: output })
		}
	})
}
