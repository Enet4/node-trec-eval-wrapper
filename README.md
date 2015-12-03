[![version](https://img.shields.io/npm/v/trec-eval-wrapper.svg)](https://www.npmjs.org/package/trec-eval-wrapper) [![TypeScript definitions on DefinitelyTyped](http://definitelytyped.org/badges/standard.svg)](http://definitelytyped.org)

# trec-eval-wrapper

This is a Node.js wrapper library for the Text REtrieval Conference (TREC) evaluation tool. `trec_eval` is a common tool for the evaluation of information retrieval systems, given the results and a standard set of judged results. This library allows for the programmatic execution of `trec_eval` in a Node.js environment.

This project does not contain the actual evaluation tool "trec_eval". In order to use this wrapper, please download and install version 9.0 or later (listed as "latest" or "9.0") in the following link: http://trec.nist.gov/trec_eval

This work holds no affiliation to NIST or the TREC community.

## Usage

The following examples assume that the trec_eval executable is in your PATH. If not, you must define the full path in the `TREC_EVAL_EXEC` environment variable.

**JavaScript (ECMAScript 5, CommonJS)**

``` JavaScript
var TREC = require('trec-eval')

TREC.evaluate('results_filename.csv', 'groundtruth_filename.csv', {}, function onOutcome(error, outcome) {
  console.log('MAP:', outcome.all.map)
  console.log('bpref:', outcome.all.bpref)
  console.log('P10:', outcome.all.p10)
  // ...
})
```

**TypeScript**

``` TypeScript
import {evaluate} from 'trec-eval'

evaluate('results_filename.csv', 'groundtruth_filename.csv', {
  query_eval_wanted: true,
  complete_rel_info_wanted: true
}, (error, {'301':q301, '302':q302, all}) => {
  if (error) {
    console.error(error.message)
    return
  }
  console.log('MAP (301):', q0.map)
  console.log('MAP (302):', q1.map)
  console.log('MAP (avg):', all.map)
  // ...
})
```

### API

#### evaluate

```TypeScript
evaluate(testFilename:string, groundtruthFilename:string, callback:(error:Error, results:TRECEvaluationSet) => void) : void
evaluate(testFilename:string, groundtruthFilename:string, options:TRECOptions, callback:(error:Error, results:TRECEvaluationSet) => void) : void
```

Perform an evaluation.

- _testFilename_: path to the testing IR system's results in CSV
- _groundtruthFilename_: path to the judged results in CSV
- _options_: a dictionary of options 

#### version

```TypeScript
version(callback:(error:Error, version:string) => void) : void
```

Obtain the version of the underlying `trec_eval` tool.

#### Options and Outcome data types

The evaluation options translate to those of the original tool, and are documented in ["typings/trec-options.d.ts"](typings/trec-options.d.ts). The evaluation outcome type aggregates measures by query run id, where "all" refers to the summary of all runs. Some measures are also documented in ["typings/trec-evaluation.d.ts"](typings/trec-evaluation.d.ts).

## License

MIT
