import {TRECEvaluationSet, TRECEvaluation} from '../typings/trec-evaluation'
import {TRECOptions} from '../typings/trec-options'
import {buildCLIargs_eval, parseCLI_eval} from './trec-eval'
import {exec, spawn} from 'child_process'

const TREC_EVAL_EXEC:string = process.env.TREC_EVAL_EXEC || 'trec_eval'

export function version(callback:(error:Error, version:string) => void) : void {
  exec(TREC_EVAL_EXEC + ' --version', (error, stdout, stderr) => {
    if (error) {
      callback(error, null)
      return
    }
    const v = stderr.toString().substr('trec_eval version '.length).trim()
    callback(null, v)
  });
}

export function evaluate(testFilename:string, groundtruthFilename:string, callback:(error:Error, results:TRECEvaluationSet) => void) : void
export function evaluate(testFilename:string, groundtruthFilename:string, options:TRECOptions, callback:(error:Error, results:TRECEvaluationSet) => void) : void

export function evaluate(testFilename:string, groundtruthFilename:string, options, callback?:(error:Error, results:TRECEvaluationSet) => void) : void {
  if (!callback && typeof options === 'function') {
    callback = options
    options = {}
  }
  const trecProcess = spawn(TREC_EVAL_EXEC, buildCLIargs_eval(testFilename, groundtruthFilename, options))
  parseCLI_eval(options, trecProcess, callback)
}

