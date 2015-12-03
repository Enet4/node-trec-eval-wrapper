import {TRECEvaluation, TRECEvaluationSet} from '../typings/trec-evaluation'
import {TRECOptions} from '../typings/trec-options'
import {Duplex} from 'stream'
import {ChildProcess} from 'child_process'

const csv:((any?) => Duplex) = require('csv-parser')

export function buildCLIargs_eval(testFilename:string, groundtruthFilename:string, options:TRECOptions) : string[] {
  var opt = []
  if (options.query_eval_wanted) {
    opt.push('-q')
  }

  if (options.measure) {
    const {measure} = options
    const measures = (typeof measure === 'string' || typeof measure === 'number') ?
      [measure] : measure
    for (let item of measures) {
      if (typeof item === 'string' || typeof item === 'number') {
        opt.push('-m' + item)
      } else {
        let m:string = '-m' + item[0]
        if (item.length > 1) {
          m += '.' + item.slice(1).join(',')
        }
        opt.push(m)
      }
    }
  }

  if (options.complete_rel_info_wanted) {
    opt.push('-c')
  }

  if (typeof options.level_for_rel === 'number') {
    opt.push('-l' + options.level_for_rel)
  }

  if (options.nosummary) {
    opt.push('-n')
  }

  if (typeof options.Number_docs_in_coll === 'number') {
    opt.push('-N' + options.Number_docs_in_coll)
  }

  if (typeof options.Max_retrieved_per_topic === 'number') {
    opt.push('-M' + options.Max_retrieved_per_topic)
  }

  if (options.Judged_docs_only) {
    opt.push('-J')
  }

  if (typeof options.Rel_info_format === 'string') {
    opt.push('-R' + options.Rel_info_format)
  }

  if (typeof options.Results_format === 'string') {
    opt.push('-T' + options.Results_format)
  }

  if (typeof options.Zscore === 'string') {
    opt.push('-Z' + options.Zscore)
  }
  
  opt.push(testFilename)
  opt.push(groundtruthFilename)
  return opt
}

function isNumberType(att:string) : boolean {
  return att !== 'runid' && !att.match(/^relstring_\d+$/)
}

export function parseCLI_eval(options:TRECOptions, child:ChildProcess, callback:(error:Error, out: TRECEvaluationSet) => void) {
    let errorBuffer:string[] = []
    child.stderr.setEncoding('utf8')
    child.stderr.on('data', (data:string) => {
      errorBuffer.push(data)
    })

    let out:TRECEvaluationSet = {}
    
    child.stdout.pipe(csv({
        headers: ['att', 'qid', 'val'],
        separator: '\t',
        newline: '\n',
    })).on('data', (data:{att:string, qid:string, val:string}) => {
      const qid = data.qid.trim()
      let run:TRECEvaluation = out[qid] = out[qid] || {}
      let att:string = data.att.trim()
      if (att.match(/^P_\d+$/)) {
        att = 'P' + att.substr(2)
      } else if (att === 'R-prec') {
        att = 'Rprec'
      }
      const val = isNumberType(att) ? +data.val :
                  att.match(/^relstring_\d+$/) ? data.val.substring(1, data.val.length-1) :
                  data.val
      run[att] = val;
    });
    
    child.on('close', code => {
      if (code !== 0) {
        callback(new Error(errorBuffer.join('')), null)
      } else {
        callback(null, out)
      }
    });

}
