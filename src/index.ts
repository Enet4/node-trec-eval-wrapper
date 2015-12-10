import {TRECEvaluationSet, TRECEvaluation} from '../typings/trec-evaluation'
import {TRECOptions} from '../typings/trec-options'
import {buildCLIargs_eval, parseCLI_eval} from './trec-eval'
import {exec, spawn} from 'child_process'

const TREC_EVAL_EXEC:string = process.env.TREC_EVAL_EXEC || 'trec_eval'

export interface TRECEvaluationCallback {
  (error:Error, results:TRECEvaluationSet) : any
}

export function version(callback:(error:Error, version:string) => any) : void {
  exec(TREC_EVAL_EXEC + ' --version', (error, stdout, stderr) => {
    if (error) {
      callback(error, null)
      return
    }
    const v = stderr.toString().substr('trec_eval version '.length).trim()
    callback(null, v)
  })
}

export function evaluate(testFilename:string, groundtruthFilename:string, options:TRECOptions, callback:TRECEvaluationCallback) : void
export function evaluate(testFilename:string, groundtruthFilename:string, callback:TRECEvaluationCallback) : void

export function evaluate(testFilename:string, groundtruthFilename:string, options:any, callback?:TRECEvaluationCallback) : void {
  if (!callback && typeof options === 'function') {
    callback = options
    options = {}
  }
  const trecProcess = spawn(TREC_EVAL_EXEC, buildCLIargs_eval(testFilename, groundtruthFilename, options))
  parseCLI_eval(options, trecProcess, callback)
}

